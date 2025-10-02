// src/components/FileUpload.jsx
import { Upload, FileText } from 'lucide-react';

function FileUpload({ file, error, onFileChange, onRemoveFile }) {
    return (
        <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Your Study Material</h2>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition">
                <Upload className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <label className="cursor-pointer">
                    <span className="text-blue-600 hover:text-blue-700 font-medium">
                        Choose a file
                    </span>
                    <span className="text-gray-600"> or drag and drop</span>
                    <input
                        type="file"
                        accept=".pdf,.txt"
                        onChange={onFileChange}
                        className="hidden"
                    />
                </label>
                <p className="text-sm text-gray-500 mt-2">PDF or TXT up to 10MB</p>
            </div>

            {file && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-gray-900">{file.name}</span>
                        <span className="text-sm text-gray-500">
                            ({(file.size / 1024).toFixed(2)} KB)
                        </span>
                    </div>
                    <button
                        onClick={onRemoveFile}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                        Remove
                    </button>
                </div>
            )}

            {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800">{error}</p>
                </div>
            )}
        </div>
    );
}

export default FileUpload;