# app/services/question_gen.py
from transformers import pipeline
import torch

# Initialize question generation pipeline
# Using T5 model fine-tuned for question generation
device = 0 if torch.cuda.is_available() else -1
question_generator = None

def get_question_generator():
    """Lazy load the question generator model."""
    global question_generator
    if question_generator is None:
        question_generator = pipeline(
            "text2text-generation",
            model="valhalla/t5-base-qg-hl",
            device=device
        )
    return question_generator

def generate_questions(text: str, max_questions: int = 5) -> list:
    """
    Generate quiz-style questions from text using Hugging Face model.
    
    Args:
        text: Cleaned input text
        max_questions: Maximum number of questions to generate
        
    Returns:
        List of generated questions
    """
    generator = get_question_generator()
    
    # Split text into chunks if too long (model has token limits)
    max_length = 512
    words = text.split()
    chunks = []
    
    for i in range(0, len(words), max_length):
        chunk = " ".join(words[i:i + max_length])
        chunks.append(chunk)
    
    questions = []
    
    # Generate questions from each chunk
    for chunk in chunks[:3]:  # Limit to first 3 chunks to avoid too many questions
        if len(chunk.strip()) < 50:  # Skip very short chunks
            continue
            
        try:
            # Generate question
            result = generator(
                chunk,
                max_length=128,
                num_return_sequences=min(2, max_questions - len(questions)),
                do_sample=True,
                top_p=0.95,
                temperature=0.7
            )
            
            for item in result:
                question = item['generated_text'].strip()
                if question and question not in questions:
                    questions.append(question)
                    
            if len(questions) >= max_questions:
                break
                
        except Exception as e:
            print(f"Error generating questions: {e}")
            continue
    
    # If no questions generated, create a fallback
    if not questions:
        questions = ["What are the main topics discussed in this text?"]
    
    return questions[:max_questions]
