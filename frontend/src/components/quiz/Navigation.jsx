import React from 'react';

const Navigation = ({ currentQuestion, totalQuestions, onPrevious, onNext, canGoNext, isLastQuestion }) => {
    return (
        <div className="flex gap-4 mt-6">
            <button
                onClick={onPrevious}
                disabled={currentQuestion === 0}
                className="px-6 py-3 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Previous
            </button>

            <button
                onClick={onNext}
                disabled={!canGoNext}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
            </button>
        </div>
    );
};

export default Navigation;