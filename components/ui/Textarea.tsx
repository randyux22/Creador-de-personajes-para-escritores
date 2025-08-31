
import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
}

export const Textarea: React.FC<TextareaProps> = ({ label, ...props }) => {
    return (
        <div>
            <label htmlFor={props.name} className="block text-sm font-medium text-slate-300 mb-1">
                {label}
            </label>
            <textarea
                id={props.name}
                className="w-full bg-base-300 text-slate-200 border border-base-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-brand-secondary transition"
                {...props}
            />
        </div>
    );
};
