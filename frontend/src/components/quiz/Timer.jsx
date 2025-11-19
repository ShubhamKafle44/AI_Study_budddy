import React from 'react';
import { Clock } from 'lucide-react';

const Timer = ({ timeLeft, totalTime }) => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const percentage = (timeLeft / totalTime) * 100;

    return (
        <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
            <Clock className={`w-6 h-6 ${timeLeft < 60 ? 'text-red-500' : 'text-blue-500'}`} />
            <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-600">Time Remaining</span>
                    <span className={`text-lg font-bold ${timeLeft < 60 ? 'text-red-500' : 'text-gray-800'}`}>
                        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                    </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className={`h-2 rounded-full transition-all ${timeLeft < 60 ? 'bg-red-500' : 'bg-blue-500'}`}
                        style={{ width: `${percentage}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Timer;