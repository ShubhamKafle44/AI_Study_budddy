// src/components/QuestionItem.jsx
import { useState } from 'react';

function QuestionItem({ question, number }) {
    const [showAnswer, setShowAnswer] = useState(false);

    return (
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {number}
                </span>
                <div className="flex-1">
                    <p className="text-gray-900 font-medium mb-2">{question.question}</p>
                    <button
                        onClick={() => setShowAnswer(!showAnswer)}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                        {showAnswer ? 'Hide Answer' : 'Show Answer'}
                    </button>
                    {showAnswer && (
                        <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded">
                            <p className="text-green-900">
                                <span className="font-semibold">Answer:</span> {question.answer}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default QuestionItem;