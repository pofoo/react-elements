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
    updateIsFormComplete?: any;
    disabled?: boolean;
}

export {
    InputProps,
}