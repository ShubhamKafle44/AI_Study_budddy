// src/components/HomePage.jsx
import { useState } from 'react';
import Header from './Header';
import Navigation from './Navigation';
import FileUpload from './FileUpload';
import ActionButtons from './ActionButtons';
import FeaturesSection from './FeaturesSection';
import ResultsView from './ResultsView';
import LoadingOverlay from './LoadingOverlay';
import Quiz from './quiz/Quiz'; // import Quiz component
import { API_BASE_URL } from '../config/api';
import quizData from '../../../backend/app/core/quiz.json'

export default function HomePage() {
    const [activeTab, setActiveTab] = useState('home');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);
    const [showQuiz, setShowQuiz] = useState(false); // new state
    const [selectedQuiz, setSelectedQuiz] = useState(null); // new
    const handleSelectQuiz = async (quizId) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_BASE_URL}/quiz/${quizId}`);
            if (!response.ok) throw new Error('Failed to fetch quiz.');

            const quiz = await response.json();
            setSelectedQuiz(quiz);  // store quiz data
            setShowQuiz(true);      // render Quiz component
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    const handleAllQuiz = async () => {
        setLoading(true);
        setError(null);
        setShowQuiz(false); // hide any currently open quiz
        setSelectedQuiz(null); // reset previously selected quiz
        setActiveTab('previous-quizzes');

        try {
            const res = await fetch(`${API_BASE_URL}/pastquizzes`);
            if (!res.ok) throw new Error('Failed to fetch past quizzes');
            const data = await res.json();
            setResults(data); // store all quizzes for PreviousQuizzes component
        } catch (err) {
            setError(err.message || 'Error fetching past quizzes');
        } finally {
            setLoading(false);
        }
    };


    const handleFetchQuiz = async (quizId) => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${API_BASE_URL}/pastquiz/${quizId}`);
            if (!res.ok) throw new Error('Failed to fetch quiz');
            const quiz = await res.json();
            setSelectedQuiz(quiz); // store the selected quiz
            setShowQuiz(true);      // show the Quiz component
        } catch (err) {
            setError(err.message || 'Error fetching quiz');
        } finally {
            setLoading(false);
        }
    };




    // --- Handle file selection ---
    const handleFileChange = (e) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        const fileType = selectedFile.name.split('.').pop().toLowerCase();
        if (fileType === 'pdf' || fileType === 'txt') {
            setFile(selectedFile);
            setError(null);
        } else {
            setError('Please upload a PDF or TXT file');
            setFile(null);
        }
    };

    // --- Generic API call ---
    const callAPI = async (endpoint) => {
        if (!file) {
            setError('Please select a file first');
            return;
        }

        setLoading(true);
        setError(null);
        setResults(null);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || `Error: ${response.statusText}`);
            }

            const data = await response.json();
            setResults(data);
            setActiveTab('results');


            // --- Special handling for quiz ---
            if (endpoint === '/generate-questions/') {
                setResults(data);    // store for reference if needed
                setShowQuiz(true);   // render Quiz component
            } else {
                setResults(data);
                setActiveTab('results');
            }

        } catch (err) {
            setError(err.message || 'Failed to process file. Make sure your backend is running.');
        } finally {
            setLoading(false);
        }
    };

    // --- Button handlers ---
    const handlePreprocess = () => callAPI('/upload/');
    const handleSummarize = () => callAPI('/summarize/');
    const handleGenerateQuestions = () => callAPI('/generate-questions/');
    const handleFullStudy = () => callAPI('/study/');

    // --- Reset everything ---
    const handleReset = () => {
        setFile(null);
        setResults(null);
        setError(null);
        setActiveTab('home');
    };

    // --- Download results as text file ---
    const handleDownload = () => {
        if (!results) return;

        let content = '';
        if (results.cleaned_text) content += `CLEANED TEXT:\n${results.cleaned_text}\n\n`;
        if (results.summary) content += `SUMMARY:\n${results.summary}\n\n`;
        if (results.questions?.length) {
            content += `QUESTIONS:\n`;
            results.questions.forEach((q, i) => {
                content += `${i + 1}. ${q.question}\nAnswer: ${q.answer}\n\n`;
            });
        }

        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'study-results.txt';
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <Header file={file} onReset={handleReset} onSelectAllQuiz={handleAllQuiz} />
            <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {activeTab === 'home' && (
                    <div className="space-y-8">
                        <FileUpload
                            file={file}
                            error={error}
                            onFileChange={handleFileChange}
                            onRemoveFile={() => setFile(null)}
                        />

                        {file && (
                            <ActionButtons
                                loading={loading}
                                onPreprocess={handlePreprocess}
                                onSummarize={handleSummarize}
                                onGenerateQuestions={handleGenerateQuestions}
                            />
                        )}

                        <FeaturesSection />
                    </div>
                )}

                {activeTab === 'results' && (
                    <ResultsView results={results} onDownload={handleDownload} />
                )}
                {/* Quiz */}
                {showQuiz && selectedQuiz?.questions && (
                    <Quiz
                        quizId={selectedQuiz.id}
                        onClose={() => setShowQuiz(false)}
                    />
                )}


            </main>

            {loading && <LoadingOverlay />}
        </div>
    );
}
