from sqlalchemy import Column, Integer, String, JSON, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Quiz(Base):
    __tablename__ = "quizzes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    time_limit = Column(Integer, nullable=False)

    questions = relationship("Question", back_populates="quiz")


class Question(Base):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(String, nullable=False)
    options = Column(JSON, nullable=False)  # store as list in JSON
    correct_answer = Column(String, nullable=False)
    quiz_id = Column(Integer, ForeignKey("quizzes.id"))

    quiz = relationship("Quiz", back_populates="questions")
