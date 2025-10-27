# app/services/file_handler.py
from fastapi import UploadFile, HTTPException
import PyPDF2
import io

async def extract_text_from_file(file: UploadFile) -> str:
    """
    Extract text from uploaded PDF or text file.
    
    Args:
        file: UploadFile object from FastAPI
        
    Returns:
        Extracted text as string
    """
    try:
        content = await file.read()
        
        # Handle PDF files
        if file.filename.endswith('.pdf'):
            pdf_file = io.BytesIO(content)
            pdf_reader = PyPDF2.PdfReader(pdf_file)
            text = ""
            for page in pdf_reader.pages:
                text += page.extract_text() + "\n"
            return text
        
        # Handle text files
        elif file.filename.endswith(('.txt', '.md')):
            return content.decode('utf-8')
        
        else:
            raise HTTPException(
                status_code=400, 
                detail="Unsupported file type. Please upload PDF or TXT files."
            )
    
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Error processing file: {str(e)}"
        )
