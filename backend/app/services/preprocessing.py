import re
import nltk
from nltk.tokenize import word_tokenize

nltk.download('punkt')

def preprocess_text(text: str) -> str:
    """
    Clean and preprocess extracted text.
    Steps:
    1. Remove special characters and multiple spaces.
    2. Lowercase text.
    3. Tokenize text.
    """
    # Remove symbols and extra spaces
    text = re.sub(r"\s+", " ", re.sub(r"[^\w\s]", " ", text))
    text = text.lower().strip()

    # Tokenize
    tokens = word_tokenize(text)
    return " ".join(tokens)
