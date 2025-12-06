// src/components/quiz/PreviousQuizzes.jsx
import React from 'react';

export default function PreviousQuizzes({ quizzes, onSelectQuiz }) {
    if (!quizzes || quizzes.length === 0) {
        return <p className="text-gray-600">No past quizzes available.</p>;
    }

    return (
        <div className="space-y-4">
            {quizzes.map((quiz) => (
                <div
                    key={quiz.id}
                    className="p-4 bg-white rounded-lg shadow hover:bg-gray-100 cursor-pointer transition"
                    onClick={() => onSelectQuiz(quiz.id)}
                >
                    <h3 className="font-semibold text-lg">{quiz.title}</h3>
                    <p className="text-sm text-gray-500">Time limit: {quiz.time_limit} seconds</p>
                </div>
            ))}
        </div>
    );
}
