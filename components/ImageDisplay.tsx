
import React from 'react';
import { Card } from './ui/Card';
import { Spinner } from './ui/Spinner';
import { type TFunction } from '../types';

interface ImageDisplayProps {
    generatedImage: string | null;
    isLoading: boolean;
    error: string | null;
    t: TFunction;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ generatedImage, isLoading, error, t }) => {
    
    const loadingMessages = React.useMemo(() => [
        t('loadingMessage1'),
        t('loadingMessage2'),
        t('loadingMessage3'),
        t('loadingMessage4'),
        t('loadingMessage5'),
        t('loadingMessage6'),
    ], [t]);

    const [loadingMessage, setLoadingMessage] = React.useState(loadingMessages[0]);

    React.useEffect(() => {
        if (isLoading) {
            setLoadingMessage(loadingMessages[0]);
            let index = 0;
            const interval = setInterval(() => {
                index = (index + 1) % loadingMessages.length;
                setLoadingMessage(loadingMessages[index]);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [isLoading, loadingMessages]);

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex flex-col items-center justify-center h-full text-center">
                    <Spinner />
                    <p className="text-slate-300 mt-4 text-lg font-medium">{loadingMessage}</p>
                    <p className="text-slate-400 text-sm mt-1">{t('loadingSubMessage')}</p>
                </div>
            );
        }
        if (error) {
            return (
                <div className="flex flex-col items-center justify-center h-full text-center text-red-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="mt-4 font-semibold">{t('errorTitle')}</p>
                    <p className="text-sm text-red-300 mt-1">{error}</p>
                </div>
            );
        }
        if (generatedImage) {
            return (
                <div className="flex flex-col items-center justify-center h-full w-full">
                    <img
                        src={generatedImage}
                        alt="Generated character"
                        className="max-w-full max-h-[calc(100%-60px)] object-contain rounded-lg animate-fade-in"
                    />
                    <a
                        href={generatedImage}
                        download={`character-${new Date().toISOString()}.jpeg`}
                        className="mt-4 w-full sm:w-auto inline-flex justify-center items-center bg-brand-secondary text-white font-bold py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-base-200 focus:ring-brand-secondary transition-colors duration-200"
                    >
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        {t('downloadImage')}
                    </a>
                </div>
            );
        }
        return (
            <div className="flex flex-col items-center justify-center h-full text-center text-slate-500">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="mt-4 text-lg">{t('imagePlaceholderTitle')}</p>
                <p className="text-sm">{t('imagePlaceholderDescription')}</p>
            </div>
        );
    };

    return (
        <Card className="h-[500px] lg:h-full flex items-center justify-center">
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in {
                    animation: fade-in 0.5s ease-out forwards;
                }
            `}</style>
            <div className="p-6 w-full h-full">
                {renderContent()}
            </div>
        </Card>
    );
};
