
import React, { useState, useCallback } from 'react';
import { CharacterForm } from './components/CharacterForm';
import { ImageDisplay } from './components/ImageDisplay';
import { Header } from './components/Header';
import { type FormData, type ReferenceImage } from './types';
import { generateCharacterImage, editCharacterImage } from './services/geminiService';
import { ART_STYLES, ASPECT_RATIOS } from './constants';
import { translations, type Language, type TranslationKey } from './locales';

const App: React.FC = () => {
    const [language, setLanguage] = useState<Language>('es');
    const [formData, setFormData] = useState<FormData>({
        appearance: '',
        clothing: '',
        mood: '',
        scene: '',
        style: ART_STYLES[0],
        aspectRatio: Object.keys(ASPECT_RATIOS)[0],
    });
    const [referenceImage, setReferenceImage] = useState<ReferenceImage | null>(null);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const t = useCallback((key: TranslationKey): string => {
        return translations[language]?.[key] || translations['en'][key];
    }, [language]);


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = (reader.result as string).split(',')[1];
                setReferenceImage({
                    base64: base64String,
                    mimeType: file.type,
                    name: file.name
                });
            };
            reader.onerror = () => {
                setError(t('errorFileRead'));
            };
            reader.readAsDataURL(file);
        } else {
            setReferenceImage(null);
        }
    };

    const handleSubmit = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setGeneratedImage(null);

        try {
            let imageB64: string;
            if (referenceImage) {
                imageB64 = await editCharacterImage(formData, referenceImage, t);
            } else {
                imageB64 = await generateCharacterImage(formData, t);
            }
            setGeneratedImage(`data:image/jpeg;base64,${imageB64}`);
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, [formData, referenceImage, t]);

    return (
        <div className="min-h-screen bg-base-100 font-sans p-4 sm:p-6 lg:p-8">
            <div className="container mx-auto max-w-7xl">
                <Header t={t} language={language} setLanguage={setLanguage} />
                <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
                    <CharacterForm
                        formData={formData}
                        setFormData={setFormData}
                        referenceImage={referenceImage}
                        handleFileChange={handleFileChange}
                        setReferenceImage={setReferenceImage}
                        onSubmit={handleSubmit}
                        isLoading={isLoading}
                        t={t}
                    />
                    <ImageDisplay
                        generatedImage={generatedImage}
                        isLoading={isLoading}
                        error={error}
                        t={t}
                    />
                </main>
            </div>
        </div>
    );
};

export default App;
