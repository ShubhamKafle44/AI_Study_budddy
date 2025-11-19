import React from 'react';
import Timer from './Timer';
import Question from './Question';
import Navigation from './Navigation';
import ProgressIndicator from './ProgressIndicator';

const ActiveQuiz = ({
    quizData,
    currentQuestion,
    timeLeft,
    selectedAnswer,
    answers,
    onSelectAnswer,
    onPrevious,
    onNext
}) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 py-8">
            <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">{quizData.title}</h1>
                    <Timer timeLeft={timeLeft} totalTime={quizData.timeLimit} />
                </div>

                <Question
                    question={quizData.questions[currentQuestion]}
                    questionNumber={currentQuestion + 1}
                    totalQuestions={quizData.questions.length}
                    selectedAnswer={selectedAnswer}
                    onSelectAnswer={onSelectAnswer}
                />

                <Navigation
                    currentQuestion={currentQuestion}
                    totalQuestions={quizData.questions.length}
                    onPrevious={onPrevious}
                    onNext={onNext}
                    canGoNext={selectedAnswer !== null}
                    isLastQuestion={currentQuestion === quizData.questions.length - 1}
                />

                <ProgressIndicator
                    questions={quizData.questions}
                    currentQuestion={currentQuestion}
                    answers={answers}
                />
            </div>
        </div>
    );
};

export default ActiveQuiz;