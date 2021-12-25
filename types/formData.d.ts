// types
import SetState from './setState';

type FormData = {
    [ key: string ]: {
        value: string;
        isValid: boolean;
    }
}

type SetFormData = SetState<FormData>;

export type {
    FormData,
    SetFormData,
} 