import React from 'react';
import { Trophy, RotateCcw } from 'lucide-react';
import AnswerReview from './AnswerReview';

const Results = ({ score, totalQuestions, answers, questions, onRestart }) => {
    const percentage = ((score / totalQuestions) * 100).toFixed(1);

    return (
        <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8 mb-6">
                <div className="text-center mb-8">
                    <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Complete!</h2>
                    <div className="text-5xl font-bold text-blue-600 my-4">
                        {score} / {totalQuestions}
                    </div>
                    <p className="text-xl text-gray-600">You scored {percentage}%</p>
                </div>

                <button
                    onClick={onRestart}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                    <RotateCcw className="w-5 h-5" />
                    Restart Quiz
                </button>
            </div>

            <AnswerReview answers={answers} questions={questions} />
        </div>
    );
};

export default Results;