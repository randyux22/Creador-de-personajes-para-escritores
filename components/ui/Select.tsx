
import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({ label, options, ...props }) => {
    return (
        <div>
            <label htmlFor={props.name} className="block text-sm font-medium text-slate-300 mb-1">
                {label}
            </label>
            <select
                id={props.name}
                className="w-full bg-base-300 text-slate-200 border border-base-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-brand-secondary transition"
                {...props}
            >
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};
