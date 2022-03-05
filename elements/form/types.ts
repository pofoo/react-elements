import type { Props as TextInputProps } from './TextInput';

type TextInputTypes = 'email' | 'username' | 'password' | 'text';

interface Match {
    value: string;
    name: string;
}

// used for form elements that do not need to be in a form wrapper component
type InputFlexOnChange = ( content: string ) => unknown;

type HTMLFormElements = HTMLInputElement | HTMLTextAreaElement;

export type {
    TextInputTypes,
    TextInputProps,
    Match,
    InputFlexOnChange,
    HTMLFormElements,
}