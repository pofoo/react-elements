import type { SetState } from '../../types';
;import type { Props as TextInputProps } from './TextInput';

type TextInputTypes = 'email' | 'username' | 'password' | 'text';

type FlexOnChange = SetState<any>;

interface Match {
    value: string;
    name: string;
}

export type {
    TextInputTypes,
    TextInputProps,
    Match,
    FlexOnChange,
}