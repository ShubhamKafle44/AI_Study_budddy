import os
import requests
import json
from pathlib import Path
from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models.quiz import Quiz, Question
from dotenv import load_dotenv


load_dotenv()
# Load from environment variables
OLLAMA_URL = os.getenv("OLLAMA_URL")
MODEL_NAME = os.getenv("OLLAMA_MODEL")

def generate_questions_from_text(text: str) -> list:
    """
    Sends text to RunPod-Ollama and receives generated questions in JSON form.
    """

    prompt = f"""
    You are a question generator. Read the following text and create 
    5 multiple-choice questions in this JSON format exactly:

    {{
        "title": "Generated Quiz",
        "time_limit": 300,
        "questions": [
            {{
                "question": "...",
                "options": ["A", "B", "C", "D"],
                "correctAnswer": "A"
            }}
        ]
    }}

    Text:
    {text}
    """

    payload = {
        "model": MODEL_NAME,
        "prompt": prompt,
        "stream": False
    }

    try:
        response = requests.post(OLLAMA_URL, json=payload)
        response.raise_for_status()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ollama request failed: {str(e)}")

    # Ollama returns {"response": "...text..."} so we extract that
    output = response.json().get("response", "")

    # Try to extract JSON from output
    try:
        quiz_json = json.loads(output)
        return quiz_json
    except json.JSONDecodeError:
        raise HTTPException(
            status_code=500,
            detail="Ollama did not return valid JSON. Model output:\n" + output
        )


def save_quiz_to_db(quiz_data: dict, db: Session) -> dict:
    """
    Takes quiz JSON from the model and stores it in the database.
    """

    title = quiz_data.get("title", "Generated Quiz")
    time_limit = quiz_data.get("time_limit", 300)
    questions = quiz_data.get("questions", [])

    if not questions:
        raise HTTPException(status_code=400, detail="No questions returned from model.")

    # Create Quiz row
    quiz = Quiz(title=title, time_limit=time_limit)
    db.add(quiz)
    db.commit()
    db.refresh(quiz)

    # Insert questions
    for q in questions:
        question_row = Question(
            quiz_id=quiz.id,
            text=q["question"],
            options=[str(o) for o in q["options"]],
            correct_answer=q["correctAnswer"]
        )
        db.add(question_row)

    db.commit()

    return {
        "quiz_id": quiz.id,
        "title": quiz.title,
        "time_limit": quiz.time_limit,
        "questions": questions
    }


def generate_questions(db: Session) -> dict:
    """
    Test mode: loads quiz.json and inserts into DB.
    Keeps your original logic.
    """
    try:
        quiz_file = Path(__file__).resolve().parents[1] / "core" / "quiz.json"

        if not quiz_file.exists():
            raise FileNotFoundError(f"{quiz_file} not found")

        data = json.load(open(quiz_file, "r", encoding="utf-8"))

        return save_quiz_to_db(data, db)

    except Exception as e:
        print(f"Error reading quiz.json: {e}")
        raise HTTPException(status_code=500, detail=str(e))
