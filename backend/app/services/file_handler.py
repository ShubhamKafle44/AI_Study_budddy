import PyPDF2
from fastapi import UploadFile
import io

async def extract_text_from_file(file: UploadFile) -> str:
    """
    Extract text from uploaded PDF or TXT files.
    """
    content = await file.read()
    if file.filename.endswith(".pdf"):
        return extract_text_from_pdf(content)
    elif file.filename.endswith(".txt"):
        return content.decode("utf-8")
    else:
        raise ValueError("Unsupported file format. Use PDF or TXT.")

def extract_text_from_pdf(content: bytes) -> str:
    """
    Extract text from PDF bytes.
    """
    reader = PyPDF2.PdfReader(io.BytesIO(content))
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    return text
