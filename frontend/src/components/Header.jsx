// src/components/Header.jsx
import { Brain, RefreshCw, BookOpen } from 'lucide-react';

function Header({ file, onReset, onSelectAllQuiz = { handleAllQuiz } }) {
    return (
        <header className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex items-center justify-between">
                    {/* Left: Logo & Title */}
                    <div className="flex items-center space-x-3">
                        <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg">
                            <Brain className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">AI Smart Buddy</h1>
                            <p className="text-sm text-gray-600">Your Intelligent Study Assistant</p>
                        </div>
                    </div>

                    {/* Right: Action Buttons */}
                    <div className="flex space-x-2">
                        {/* New Document: only visible if a file is selected */}
                        {file && (
                            <button
                                onClick={onReset}
                                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                            >
                                <RefreshCw className="w-4 h-4" />
                                <span>New Document</span>
                            </button>
                        )}

                        {/* Quiz: opens previous quizzes */}
                        <button
                            onClick={onSelectAllQuiz}
                            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
                        >
                            <BookOpen className="w-4 h-4" />
                            <span>Quiz</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
