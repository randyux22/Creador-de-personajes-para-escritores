
import { GoogleGenAI, Modality } from "@google/genai";
import { type FormData, type ReferenceImage, type TFunction } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const ASPECT_RATIOS: { [key: string]: string } = {
    '1:1': 'Square',
    '16:9': 'Landscape',
    '9:16': 'Portrait',
    '4:3': 'Standard',
    '3:4': 'Tall'
};

export async function generateCharacterImage(formData: FormData, t: TFunction): Promise<string> {
    const { appearance, clothing, mood, scene, style, aspectRatio } = formData;

    const prompt = `Generate a high-quality, detailed image of a character.
    Style: ${style}.
    Appearance: ${appearance || 'Not specified'}.
    Clothing: ${clothing || 'Not specified'}.
    Mood: ${mood || 'Neutral'}.
    Scene/Background: ${scene || 'Simple background'}.
    The image must be visually compelling and adhere to the specified style.`;

    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/jpeg',
                aspectRatio: aspectRatio as "1:1" | "3:4" | "4:3" | "9:16" | "16:9",
            },
        });
        
        if (response.generatedImages && response.generatedImages.length > 0) {
            return response.generatedImages[0].image.imageBytes;
        } else {
            throw new Error(t('errorNoImageReturned'));
        }
    } catch (error) {
        console.error("Error generating image with Imagen:", error);
        throw new Error(t('errorImageGeneration'));
    }
}


export async function editCharacterImage(formData: FormData, referenceImage: ReferenceImage, t: TFunction): Promise<string> {
    const { appearance, clothing, mood, scene, style, aspectRatio } = formData;
    const aspectRatioLabel = ASPECT_RATIOS[aspectRatio] || 'Square';

    const prompt = `Using the provided image as a base, transform the character with the following details.
    Create a new image in a ${style} style.
    The final image should have a ${aspectRatioLabel} (${aspectRatio}) aspect ratio.
    New Appearance Details: ${appearance || 'Keep similar to reference'}.
    New Clothing: ${clothing || 'Keep similar to reference'}.
    New Mood: ${mood || 'Keep similar to reference'}.
    New Scene/Background: ${scene || 'Keep similar to reference'}.
    Dramatically reinterpret the source image based on these instructions to create a new, distinct piece of art.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image-preview',
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: referenceImage.base64,
                            mimeType: referenceImage.mimeType,
                        },
                    },
                    { text: prompt },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });

        if (response.candidates && response.candidates[0].content.parts) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    return part.inlineData.data;
                }
            }
        }
        throw new Error(t('errorNoImagePartReturned'));

    } catch (error) {
        console.error("Error editing image with Gemini:", error);
        throw new Error(t('errorImageEditing'));
    }
}
