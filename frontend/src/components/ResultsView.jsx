// src/components/ResultsView.jsx
import { Brain, Download, FileText, BookOpen, CheckSquare } from 'lucide-react';
import ResultCard from './ResultCard';
import QuestionItem from './QuestionItem';

function ResultsView({ results }) {
    const handleDownload = () => {
        if (!results) return;

        let content = '';
        if (results.cleaned_text) {
            content += `CLEANED TEXT:\n${results.cleaned_text}\n\n`;
        }
        if (results.summary) {
            content += `SUMMARY:\n${results.summary}\n\n`;
        }
        if (results.questions) {
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
        a.click();
        URL.revokeObjectURL(url);
    };

    if (!results) {
        return (
            <div className="text-center py-16">
                <Brain className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Results Yet</h3>
                <p className="text-gray-600">Upload a file and run an action to see results here</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Results</h2>
                <button
                    onClick={handleDownload}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                </button>
            </div>

            {results.cleaned_text && (
                <ResultCard title="Cleaned Text" icon={<FileText className="w-6 h-6" />}>
                    <p className="text-gray-700 whitespace-pre-wrap">{results.cleaned_text}</p>
                </ResultCard>
            )}

            {results.summary && (
                <ResultCard title="Summary" icon={<BookOpen className="w-6 h-6" />}>
                    <p className="text-gray-700 leading-relaxed">{results.summary}</p>
                </ResultCard>
            )}

            {results.questions && results.questions.length > 0 && (
                <ResultCard title="Quiz Questions" icon={<CheckSquare className="w-6 h-6" />}>
                    <div className="space-y-4">
                        {results.questions.map((q, index) => (
                            <QuestionItem key={index} question={q} number={index + 1} />
                        ))}
                    </div>
                </ResultCard>
            )}

            {typeof results === 'string' && (
                <ResultCard title="Response" icon={<FileText className="w-6 h-6" />}>
                    <p className="text-gray-700 whitespace-pre-wrap">{results}</p>
                </ResultCard>
            )}
        </div>
    );
}

export default ResultsView;