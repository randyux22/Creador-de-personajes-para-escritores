
import { type TranslationKey } from './locales/index';

export interface FormData {
  name: string;
  appearance: string;
  clothing: string;
  mood: string;
  scene: string;
  style: string;
  aspectRatio: string;
}

export interface ReferenceImage {
    base64: string;
    mimeType: string;
    name: string;
}

export type TFunction = (key: TranslationKey) => string;
