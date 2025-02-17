import React from 'react';

const SportBadge = ({ sport }) => {
    const getSportColor = (sport) => {
        switch (sport.toLowerCase()) {
            case 'baseball':
                return 'bg-blue-100 text-blue-600';
            case 'basketball':
                return 'bg-orange-100 text-orange-600';
            default:
                return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <span className={`px-3 py-1 rounded-md text-sm ${getSportColor(sport)}`}>
            {sport}
        </span>
    );
};

export default SportBadge; 