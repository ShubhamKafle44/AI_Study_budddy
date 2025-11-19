import React from 'react';
import { Trophy } from 'lucide-react';

const StartScreen = ({ quizTitle, questionsCount, timeLimit, onStart }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
                <div className="text-center">
                    <Trophy className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{quizTitle}</h1>
                    <p className="text-gray-600 mb-6">Test your knowledge with {questionsCount} questions</p>

                    <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
                        <h3 className="font-semibold text-gray-800 mb-2">Quiz Details:</h3>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• {questionsCount} questions</li>
                            <li>• {Math.floor(timeLimit / 60)} minutes time limit</li>
                            <li>• Multiple choice format</li>
                            <li>• Instant results</li>
                        </ul>
                    </div>

                    <button
                        onClick={onStart}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                        Start Quiz
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StartScreen;