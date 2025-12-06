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
    summarizer = get_summarizer()

    if len(text.split()) < 50:
        return text  # very short text, just return it

    words = text.split()
    MAX_TOTAL_WORDS = 20000
    if len(words) > MAX_TOTAL_WORDS:
        words = words[:MAX_TOTAL_WORDS]

    max_chunk_size = 1024
    chunks = [" ".join(words[i:i + max_chunk_size]) for i in range(0, len(words), max_chunk_size)]

    summaries = []

    for chunk in chunks:
        chunk = chunk.strip()
        if len(chunk.split()) < 10:
            continue

        try:
            chunk_min_length = min(min_length, max(10, len(chunk.split())))
            result = summarizer(
                chunk,
                max_length=max_length,
                min_length=chunk_min_length,
                do_sample=False
            )
            if result and isinstance(result, list) and len(result) > 0 and 'summary_text' in result[0]:
                summaries.append(result[0]['summary_text'])
        except Exception as e:
            print(f"[WARN] Skipping chunk due to error: {e}")
            continue

    if not summaries:
        # fallback for text that can't be summarized
        return " ".join(words[:150])

    combined = " ".join(summaries)
    if len(combined.split()) > max_length:
        try:
            chunk_min_length = min(min_length, max(10, len(combined.split())))
            result = summarizer(
                combined,
                max_length=max_length,
                min_length=chunk_min_length,
                do_sample=False
            )
            if result and isinstance(result, list) and len(result) > 0 and 'summary_text' in result[0]:
                return result[0]['summary_text']
        except Exception as e:
            print(f"[WARN] Skipping final combined summary due to error: {e}")
            return combined

    return combined
