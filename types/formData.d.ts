// types
import SetState from './setState';

type FormData = {
    [ key: string ]: {
        value: string;
        isValid: boolean;
    }
}

type SetFormData = SetState<FormData>;

// Promise included for encrypted passwords with bycryptjs
interface TransformedFormData<T extends Object> extends T {
    [ key: string ]: string | Promise<string>;
}

export type {
    FormData,
    SetFormData,
    TransformedFormData,
} 