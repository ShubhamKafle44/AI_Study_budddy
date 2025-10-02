// src/components/FeaturesSection.jsx
import { FileText, BookOpen, CheckSquare } from 'lucide-react';

function FeaturesSection() {
    return (
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-6">Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Feature
                    icon={<FileText className="w-6 h-6" />}
                    title="Text Extraction"
                    description="Extract and clean text from PDFs and documents"
                />
                <Feature
                    icon={<BookOpen className="w-6 h-6" />}
                    title="Smart Summaries"
                    description="AI-powered summarization using advanced NLP"
                />
                <Feature
                    icon={<CheckSquare className="w-6 h-6" />}
                    title="Quiz Generation"
                    description="Automatically create practice questions"
                />
            </div>
        </div>
    );
}

function Feature({ icon, title, description }) {
    return (
        <div className="flex items-start space-x-3">
            <div className="bg-white bg-opacity-20 p-2 rounded-lg">{icon}</div>
            <div>
                <h4 className="font-semibold mb-1">{title}</h4>
                <p className="text-sm opacity-90">{description}</p>
            </div>
        </div>
    );
}

export default FeaturesSection;