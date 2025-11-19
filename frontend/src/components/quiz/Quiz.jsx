import React, { useState, useEffect } from 'react';
import StartScreen from './StartScreen';
import ActiveQuiz from './ActiveQuiz';
import Results from './Results';
import quizData from '../../data/quizData.json';

const Quiz = () => {
    const [quizState, setQuizState] = useState('start');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(quizData.timeLimit);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    useEffect(() => {
        if (quizState === 'active' && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        setQuizState('complete');
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [quizState, timeLeft]);

    const startQuiz = () => {
        setQuizState('active');
        setCurrentQuestion(0);
        setAnswers({});
        setTimeLeft(quizData.timeLimit);
        setSelectedAnswer(null);
    };

    const handleSelectAnswer = (answerIndex) => {
        setSelectedAnswer(answerIndex);
    };

    const handleNext = () => {
        if (selectedAnswer !== null) {
            setAnswers(prev => ({
                ...prev,
                [quizData.questions[currentQuestion].id]: selectedAnswer
            }));
        }

        if (currentQuestion < quizData.questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
            setSelectedAnswer(answers[quizData.questions[currentQuestion + 1]?.id] ?? null);
        } else {
            setQuizState('complete');
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            if (selectedAnswer !== null) {
                setAnswers(prev => ({
                    ...prev,
                    [quizData.questions[currentQuestion].id]: selectedAnswer
                }));
            }
            setCurrentQuestion(prev => prev - 1);
            setSelectedAnswer(answers[quizData.questions[currentQuestion - 1]?.id] ?? null);
        }
    };

    const calculateScore = () => {
        return quizData.questions.reduce((score, question) => {
            return score + (answers[question.id] === question.correctAnswer ? 1 : 0);
        }, 0);
    };

    if (quizState === 'start') {
        return (
            <StartScreen
                quizTitle={quizData.title}
                questionsCount={quizData.questions.length}
                timeLimit={quizData.timeLimit}
                onStart={startQuiz}
            />
        );
    }

    if (quizState === 'complete') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 py-8">
                <Results
                    score={calculateScore()}
                    totalQuestions={quizData.questions.length}
                    answers={answers}
                    questions={quizData.questions}
                    onRestart={startQuiz}
                />
            </div>
        );
    }

    return (
        <ActiveQuiz
            quizData={quizData}
            currentQuestion={currentQuestion}
            timeLeft={timeLeft}
            selectedAnswer={selectedAnswer}
            answers={answers}
            onSelectAnswer={handleSelectAnswer}
            onPrevious={handlePrevious}
            onNext={handleNext}
        />
    );
};

export default Quiz;