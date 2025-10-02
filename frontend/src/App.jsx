// src/App.jsx
import { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import FileUpload from './components/FileUpload';
import ActionButtons from './components/ActionButtons';
import FeaturesSection from './components/FeaturesSection';
import ResultsView from './components/ResultsView';
import LoadingOverlay from './components/LoadingOverlay';
import { API_BASE_URL } from './config/api';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  // --- Handle file selection ---
  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0]; // safer optional chaining
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
        const errorText = await response.text(); // get backend error message
        throw new Error(errorText || `Error: ${response.statusText}`);
      }

      const data = await response.json();
      setResults(data);
      setActiveTab('results');
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
    document.body.appendChild(a); // append to body to fix Firefox bug
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header file={file} onReset={handleReset} />
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
                onFullStudy={handleFullStudy}
              />
            )}

            <FeaturesSection />
          </div>
        )}

        {activeTab === 'results' && (
          <ResultsView results={results} onDownload={handleDownload} />
        )}
      </main>

      {loading && <LoadingOverlay />}
    </div>
  );
}

export default App;
