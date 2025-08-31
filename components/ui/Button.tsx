
import React from 'react';
import { Spinner } from './Spinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, isLoading, ...props }) => {
    return (
        <button
            className="w-full flex justify-center items-center bg-brand-primary text-white font-bold py-3 px-4 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-base-100 focus:ring-brand-secondary disabled:bg-base-300 disabled:cursor-not-allowed transition-colors duration-200"
            {...props}
        >
            {isLoading && <Spinner className="mr-2" />}
            {children}
        </button>
    );
};
