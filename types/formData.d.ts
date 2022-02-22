// types
import SetState from './setState';

interface FormDataValues {
    value: string;
    isValid: boolean;
    resetTouched?: true;
}

interface FormData<T extends object = object> extends T {
    [ key: string ]: FormDataValues;
}

type SetFormData = SetState<FormData>;

// Promise included for encrypted passwords with bycryptjs
interface TransformedFormData<T extends object = object> extends T {
    [ key: string ]: string | Promise<string>;
}

export type {
    FormData,
    SetFormData,
    TransformedFormData,
    FormDataValues,
} 