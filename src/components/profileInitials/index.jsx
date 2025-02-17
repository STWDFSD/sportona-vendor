import React from 'react';

const ProfileInitials = ({ name }) => {
    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase();
    };

    return (
        <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-medium">
            {getInitials(name)}
        </div>
    );
};

export default ProfileInitials; 