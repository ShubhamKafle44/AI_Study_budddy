from fastapi import APIRouter, UploadFile, File
from app.services.file_handler import extract_text_from_file
from app.services.preprocessing import preprocess_text
from app.services.question_gen import generate_questions
from app.services.summarization import summarize_text

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
async def get_questions(file: UploadFile = File(...)):
    """
    Upload a PDF or text file, and generate quiz-style questions.
    """
    raw_text = await extract_text_from_file(file)
    cleaned_text = preprocess_text(raw_text)
    questions = generate_questions(cleaned_text)
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
    questions = generate_questions(cleaned_text)
    return {
        "cleaned_text": cleaned_text,
        "summary": summary,
        "questions": questions
    }
