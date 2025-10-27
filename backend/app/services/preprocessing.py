# app/services/preprocessing.py
import re

def preprocess_text(text: str) -> str:
    """
    Clean and preprocess extracted text.
    
    Args:
        text: Raw text string
        
    Returns:
        Cleaned text string
    """
    # Remove extra whitespace
    text = re.sub(r'\s+', ' ', text)
    
    # Remove special characters but keep basic punctuation
    text = re.sub(r'[^\w\s.,!?;:\-\(\)]', '', text)
    
    # Remove multiple consecutive punctuation marks
    text = re.sub(r'([.,!?;:]){2,}', r'\1', text)
    
    # Strip leading/trailing whitespace
    text = text.strip()
    
    return text
