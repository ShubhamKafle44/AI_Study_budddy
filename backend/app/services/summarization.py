from transformers import pipeline

# Load summarization pipeline (this can be loaded once at server start)
summarizer = pipeline("summarization")

def summarize_text(text: str, max_length: int = 150, min_length: int = 50) -> str:
    """
    Generate a summary of the given text using Hugging Face Transformers.
    """
    if len(text.strip()) == 0:
        return "No text to summarize."
    
    # Hugging Face summarization returns a list of dicts
    summary = summarizer(text, max_length=max_length, min_length=min_length, do_sample=False)
    return summary[0]['summary_text']
