import React from 'react';

const StatusBadge = ({ status }) => {
    const getStatusStyle = (status) => {
        if (status.includes('Expired')) {
            return 'bg-red-50 text-red-600';
        }
        if (status.includes('day left')) {
            const days = parseInt(status);
            if (days <= 1) {
                return 'bg-yellow-50 text-yellow-600';
            }
            if (days <= 3) {
                return 'bg-orange-50 text-orange-600';
            }
            return 'bg-green-50 text-green-600';
        }
        return 'bg-gray-50 text-gray-600';
    };

    return (
        <div className="flex justify-center">
            <span className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(status)}`}>
                {status}
            </span>
        </div>
    );
};

export default StatusBadge; 