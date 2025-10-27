# app/services/summarization.py
from transformers import pipeline
import torch

# Initialize summarization pipeline
device = 0 if torch.cuda.is_available() else -1
summarizer = None

def get_summarizer():
    """Lazy load the summarization model."""
    global summarizer
    if summarizer is None:
        summarizer = pipeline(
            "summarization",
            model="facebook/bart-large-cnn",
            device=device
        )
    return summarizer

def summarize_text(text: str, max_length: int = 150, min_length: int = 50) -> str:
    """
    Generate a summary of the input text using Hugging Face model.
    
    Args:
        text: Cleaned input text
        max_length: Maximum length of summary
        min_length: Minimum length of summary
        
    Returns:
        Generated summary as string
    """
    summarizer = get_summarizer()
    
    # Handle short texts
    if len(text.split()) < 100:
        return text
    
    # Split long texts into chunks (BART has 1024 token limit)
    max_chunk_size = 1024
    words = text.split()
    MAX_TOTAL_WORDS = 20000  # ~15–20 pages
    if len(words) > MAX_TOTAL_WORDS:
        words = words[:MAX_TOTAL_WORDS]

    chunks = []
    
    for i in range(0, len(words), max_chunk_size):
        chunk = " ".join(words[i:i + max_chunk_size])
        chunks.append(chunk)
    
    summaries = []
    
    try:
        # Summarize each chunk
        for chunk in chunks:
            if len(chunk.strip()) < 50:
                continue
                
            result = summarizer(
                chunk,
                max_length=max_length,
                min_length=min_length,
                do_sample=False
            )
            
            summaries.append(result[0]['summary_text'])
        
        # Combine summaries
        if len(summaries) > 1:
            combined = " ".join(summaries)
            # Summarize again if combined is too long
            if len(combined.split()) > max_length:
                result = summarizer(
                    combined,
                    max_length=max_length,
                    min_length=min_length,
                    do_sample=False
                )
                return result[0]['summary_text']
            return combined
        elif summaries:
            return summaries[0]
        else:
            return "Unable to generate summary from the provided text."
            
    except Exception as e:
        print(f"Error generating summary: {e}")
        return f"Error generating summary: {str(e)}"
