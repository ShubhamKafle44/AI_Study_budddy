import React from 'react';

const Question = ({ question, questionNumber, totalQuestions, selectedAnswer, onSelectAnswer }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-4">
                <span className="text-sm text-gray-500 font-medium">
                    Question {questionNumber} of {totalQuestions}
                </span>
                <h2 className="text-xl font-bold text-gray-800 mt-2">{question.question}</h2>
            </div>

            <div className="space-y-3">
                {question.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => onSelectAnswer(index)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${selectedAnswer === index
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedAnswer === index
                                    ? 'border-blue-500 bg-blue-500'
                                    : 'border-gray-300'
                                }`}>
                                {selectedAnswer === index && (
                                    <div className="w-3 h-3 bg-white rounded-full" />
                                )}
                            </div>
                            <span className="text-gray-800">{option}</span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Question;