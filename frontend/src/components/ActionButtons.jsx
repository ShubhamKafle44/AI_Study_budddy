// src/components/ActionButtons.jsx
import { FileText, BookOpen, CheckSquare, Brain } from 'lucide-react';
import ActionCard from './ActionCard';

function ActionButtons({ loading, onPreprocess, onSummarize, onGenerateQuestions, onFullStudy }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <ActionCard
                icon={<FileText className="w-8 h-8" />}
                title="Preprocess"
                description="Clean and prepare text"
                onClick={onPreprocess}
                loading={loading}
                color="blue"
            />
            <ActionCard
                icon={<BookOpen className="w-8 h-8" />}
                title="Summarize"
                description="Get AI-powered summary"
                onClick={onSummarize}
                loading={loading}
                color="green"
            />
            <ActionCard
                icon={<CheckSquare className="w-8 h-8" />}
                title="Generate Quiz"
                description="Create practice questions"
                onClick={onGenerateQuestions}
                loading={loading}
                color="purple"
            />
            <ActionCard
                icon={<Brain className="w-8 h-8" />}
                title="Full Study Mode"
                description="Get everything at once"
                onClick={onFullStudy}
                loading={loading}
                color="indigo"
                featured
            />
        </div>
    );
}

export default ActionButtons;