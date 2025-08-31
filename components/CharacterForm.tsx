
import React from 'react';
import { type FormData, type ReferenceImage, type TFunction } from '../types';
import { ART_STYLE_KEYS, ASPECT_RATIOS } from '../constants';
import { Textarea } from './ui/Textarea';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { type TranslationKey } from '../locales/index';

interface CharacterFormProps {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    referenceImage: ReferenceImage | null;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setReferenceImage: React.Dispatch<React.SetStateAction<ReferenceImage | null>>;
    onSubmit: () => void;
    isLoading: boolean;
    t: TFunction;
}

export const CharacterForm: React.FC<CharacterFormProps> = ({
    formData,
    setFormData,
    referenceImage,
    handleFileChange,
    setReferenceImage,
    onSubmit,
    isLoading,
    t
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <Card>
            <div className="p-6">
                <h2 className="text-2xl font-semibold text-white mb-4">{t('describeYourCharacter')}</h2>
                <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-4">
                    <Textarea
                        label={t('appearanceLabel')}
                        name="appearance"
                        value={formData.appearance}
                        onChange={handleChange}
                        placeholder={t('appearancePlaceholder')}
                        rows={3}
                    />
                    <Textarea
                        label={t('clothingLabel')}
                        name="clothing"
                        value={formData.clothing}
                        onChange={handleChange}
                        placeholder={t('clothingPlaceholder')}
                        rows={2}
                    />
                    <Input
                        label={t('moodLabel')}
                        name="mood"
                        type="text"
                        value={formData.mood}
                        onChange={handleChange}
                        placeholder={t('moodPlaceholder')}
                    />
                    <Textarea
                        label={t('sceneLabel')}
                        name="scene"
                        value={formData.scene}
                        onChange={handleChange}
                        placeholder={t('scenePlaceholder')}
                        rows={2}
                    />
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">
                            {t('referenceImageLabel')}
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-base-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <svg className="mx-auto h-12 w-12 text-slate-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <div className="flex text-sm text-slate-400">
                                    <label htmlFor="file-upload" className="relative cursor-pointer bg-base-200 rounded-md font-medium text-brand-secondary hover:text-blue-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-base-100 focus-within:ring-brand-secondary px-1">
                                        <span>{t('uploadAFile')}</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*"/>
                                    </label>
                                    <p className="pl-1">{t('dragAndDrop')}</p>
                                </div>
                                {referenceImage ? (
                                    <div className="text-xs text-slate-400 mt-2 flex items-center justify-center">
                                      <span>{referenceImage.name}</span>
                                      <button onClick={() => { 
                                          setReferenceImage(null);
                                          const input = document.getElementById('file-upload') as HTMLInputElement;
                                          if (input) input.value = '';
                                        }} className="ml-2 text-red-400 hover:text-red-300">&times;</button>
                                    </div>
                                ) : (
                                    <p className="text-xs text-slate-500">{t('fileTypes')}</p>
                                )}
                            </div>
                        </div>
                         <p className="text-xs text-slate-500 mt-1">{t('referenceImageHint')}</p>
                    </div>
                    <Select
                        label={t('artStyleLabel')}
                        name="style"
                        value={formData.style}
                        onChange={handleChange}
                        options={ART_STYLE_KEYS.map(styleKey => ({ 
                            value: styleKey, 
                            label: t(styleKey as TranslationKey) 
                        }))}
                    />
                    <Select
                        label={t('imageDimensionsLabel')}
                        name="aspectRatio"
                        value={formData.aspectRatio}
                        onChange={handleChange}
                        options={Object.entries(ASPECT_RATIOS).map(([value, labelKey]) => ({ 
                            value, 
                            label: `${t(labelKey as TranslationKey)} (${value})` 
                        }))}
                    />
                    <div className="pt-4">
                        <Button type="submit" isLoading={isLoading} disabled={isLoading}>
                           {isLoading ? t('submitButtonLoading') : t('submitButton')}
                        </Button>
                    </div>
                </form>
            </div>
        </Card>
    );
};