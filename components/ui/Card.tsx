
import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
    return (
        <div className={`bg-base-200 rounded-lg shadow-lg overflow-hidden ${className}`}>
            {children}
        </div>
    );
};
