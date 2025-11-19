import React from 'react';

const ProgressIndicator = ({ questions, currentQuestion, answers }) => {
    return (
        <div className="mt-4 flex gap-2 justify-center flex-wrap">
            {questions.map((q, index) => (
                <div
                    key={index}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${index === currentQuestion
                            ? 'bg-blue-600 text-white'
                            : answers[q.id] !== undefined
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-200 text-gray-600'
                        }`}
                >
                    {index + 1}
                </div>
            ))}
        </div>
    );
};

export default ProgressIndicator;