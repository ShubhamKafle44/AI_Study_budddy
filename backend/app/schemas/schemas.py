from pydantic import BaseModel
from typing import List

class QuestionSchema(BaseModel):
    text: str
    options: List[str]
    correct_answer: str

    class Config:
        orm_mode = True

class QuizSchema(BaseModel):
    id: int
    title: str
    time_limit: int
    questions: List[QuestionSchema]

    class Config:
        orm_mode = True
