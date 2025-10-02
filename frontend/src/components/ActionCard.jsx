// src/components/ActionCard.jsx
function ActionCard({ icon, title, description, onClick, loading, color, featured }) {
    const colors = {
        blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
        green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
        purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
        indigo: 'from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700',
    };

    return (
        <button
            onClick={onClick}
            disabled={loading}
            className={`bg-gradient-to-br ${colors[color]} text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${featured ? 'ring-2 ring-yellow-400 ring-offset-2' : ''
                }`}
        >
            <div className="flex flex-col items-center text-center space-y-3">
                {icon}
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="text-sm opacity-90">{description}</p>
            </div>
        </button>
    );
}

export default ActionCard;