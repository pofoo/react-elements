import type { Props as TextInputProps } from './TextInput';

type TextInputTypes = 'email' | 'username' | 'password' | 'text';

interface Match {
    value: string;
    name: string;
}

export type {
    TextInputTypes,
    TextInputProps,
    Match,
}