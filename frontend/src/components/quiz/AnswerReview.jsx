import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const AnswerReview = ({ answers, questions }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Answer Review</h3>
            <div className="space-y-4">
                {questions.map((question) => {
                    const userAnswer = answers[question.id]; // this should now be the string answer
                    const isCorrect = userAnswer === question.correctAnswer;

                    return (
                        <div key={question.id} className="border-b border-gray-200 pb-4 last:border-0">
                            <div className="flex items-start gap-3 mb-2">
                                {isCorrect ? (
                                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                ) : (
                                    <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                                )}
                                <div className="flex-1">
                                    <p className="font-medium text-gray-800 mb-2">{question.question}</p>
                                    <p className="text-sm text-gray-600">
                                        Your answer: <span className={isCorrect ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                                            {userAnswer || 'No answer'}
                                        </span>
                                    </p>
                                    {!isCorrect && (
                                        <p className="text-sm text-gray-600">
                                            Correct answer: <span className="text-green-600 font-medium">
                                                {question.correctAnswer}
                                            </span>
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AnswerReview;
