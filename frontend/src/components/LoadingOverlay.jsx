// src/components/LoadingOverlay.jsx
import { Loader2 } from 'lucide-react';

function LoadingOverlay() {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 flex flex-col items-center space-y-4">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                <p className="text-lg font-medium text-gray-900">Processing your document...</p>
                <p className="text-sm text-gray-600">This may take a few moments</p>
            </div>
        </div>
    );
}

export default LoadingOverlay;