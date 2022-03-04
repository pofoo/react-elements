import type { FormData, UpdateCache } from '../../types';
import type { Props as TextInputProps } from './TextInput';

type TextInputTypes = 'email' | 'username' | 'password' | 'text';

interface Match {
    value: string;
    name: string;
}

type InputFlexOnChange = ( content: string ) => void;

type HTMLFormElements = HTMLInputElement | HTMLTextAreaElement;

interface TextInputCache {
    updateCache: UpdateCache<FormData>;
    formData: FormData;
}

interface TextareaCache {
    updateCache: UpdateCache;
    formData?: FormData;
}

export type {
    TextInputTypes,
    TextInputProps,
    Match,
    TextInputCache,
    TextareaCache,
    InputFlexOnChange,
    HTMLFormElements,
}