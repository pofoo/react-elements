// types
import type { SetFormData } from '../../types';

type Content = {
    label: string;
    value?: string;
    placeholder?: string;
}

type InputProps = {
    onChange: SetFormData;
    content: Content;
    checkFormStatus?: ( checkDisabled: boolean ) => void;
    disabled?: boolean;
    isParentDisabled?: boolean;
}

export {
    InputProps,
}