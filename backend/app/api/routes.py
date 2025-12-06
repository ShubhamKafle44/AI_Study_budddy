from fastapi import APIRouter, HTTPException, UploadFile, File
from app.services.file_handler import extract_text_from_file
from app.services.preprocessing import preprocess_text
from app.services.summarization import summarize_text
from app.services.question_gen import generate_questions_from_text
from sqlalchemy.orm import Session
from app.database import get_db 
from app.models.quiz import Quiz, Question 
from fastapi.responses import JSONResponse
from fastapi import Depends
router = APIRouter()

@router.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    """
    Upload a PDF or text file, extract text, preprocess it, and return cleaned text.
    """
    raw_text = await extract_text_from_file(file)
    cleaned_text = preprocess_text(raw_text)
    return {"cleaned_text": cleaned_text, "status": "success"}

@router.post("/generate-questions/")
async def get_questions(file: UploadFile = File(...),db: Session = Depends(get_db)):
    """
    Upload a PDF or text file, and generate quiz-style questions.
    """
    raw_text = await extract_text_from_file(file)
    cleaned_text = preprocess_text(raw_text)
    questions = generate_questions_from_text(cleaned_text)
    return {"questions": questions}

@router.post("/summarize/")
async def get_summary(file: UploadFile = File(...)):
    """
    Upload a PDF or text file and generate a summary.
    """
    raw_text = await extract_text_from_file(file)
    cleaned_text = preprocess_text(raw_text)
    summary = summarize_text(cleaned_text)
    return {"summary": summary}

@router.post("/study/")
async def study_file(file: UploadFile = File(...)):
    """
    Full pipeline: upload file -> preprocess -> summarize -> generate questions.
    """
    raw_text = await extract_text_from_file(file)
    cleaned_text = preprocess_text(raw_text)
    summary = summarize_text(cleaned_text)
    questions = generate_questions_from_text(cleaned_text)
    return {
        "cleaned_text": cleaned_text,
        "summary": summary,
        "questions": questions
    }



# ------------------------------------
# Get all past quizzes
# ------------------------------------
@router.get("/pastquizzes")
def get_past_quizzes(db: Session = Depends(get_db)):
    quizzes = db.query(Quiz).all()

    return [
        {
            "id": q.id,
            "title": q.title,
            "timeLimit": q.time_limit
        }
        for q in quizzes
    ]


# ------------------------------------
# Get quiz with all questions
# ------------------------------------
@router.get("/quiz/{quiz_id}")
def get_quiz(quiz_id: int, db: Session = Depends(get_db)):
    quiz = db.query(Quiz).filter(Quiz.id == quiz_id).first()

    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")

    return {
        "id": quiz.id,
        "title": quiz.title,
        "timeLimit": quiz.time_limit,
        "questions": [
            {
                "id": q.id,
                "text": q.text,
                "options": q.options,
                "correctAnswer": q.correct_answer
            }
            for q in quiz.questions
        ]
    }