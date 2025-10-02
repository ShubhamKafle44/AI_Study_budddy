// src/components/ResultCard.jsx
function ResultCard({ title, icon, children }) {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4 pb-3 border-b border-gray-200">
                <div className="text-blue-600">{icon}</div>
                <h3 className="text-xl font-bold text-gray-900">{title}</h3>
            </div>
            {children}
        </div>
    );
}

export default ResultCard;