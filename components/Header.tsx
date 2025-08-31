
import React from 'react';
import { type Language } from '../locales';
import { type TFunction } from '../types';

interface HeaderProps {
    t: TFunction;
    language: Language;
    setLanguage: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({ t, language, setLanguage }) => {
    return (
        <header className="text-center relative">
            <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">
                {t('appTitle')}
            </h1>
            <p className="mt-2 text-lg text-slate-400 max-w-2xl mx-auto">
                {t('appDescription')}
            </p>
            <div className="absolute top-0 right-0 flex items-center space-x-2">
                <button 
                    onClick={() => setLanguage('en')}
                    className={`px-3 py-1 text-sm rounded-md transition-colors ${language === 'en' ? 'bg-brand-secondary text-white' : 'bg-base-300 text-slate-300 hover:bg-base-200'}`}
                >
                    {t('english')}
                </button>
                 <button 
                    onClick={() => setLanguage('es')}
                    className={`px-3 py-1 text-sm rounded-md transition-colors ${language === 'es' ? 'bg-brand-secondary text-white' : 'bg-base-300 text-slate-300 hover:bg-base-200'}`}
                >
                    {t('spanish')}
                </button>
            </div>
        </header>
    );
};
