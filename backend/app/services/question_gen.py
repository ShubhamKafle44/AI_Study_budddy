import random

def generate_questions(text: str) -> list:
    """
    Generate simple question-answer pairs for Milestone 2.
    For now, extract sentences and create 'fill-in-the-blank' questions.
    """
    sentences = text.split(". ")
    questions = []
    for sent in sentences[:5]:  # Limit to 5 questions for demo
        words = sent.split()
        if len(words) > 4:
            idx = random.randint(0, len(words)-1)
            answer = words[idx]
            words[idx] = "_____"
            question = " ".join(words)
            questions.append({"question": question, "answer": answer})
    return questions
