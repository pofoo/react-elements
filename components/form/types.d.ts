// types
import type { SetFormData, FormData } from '../../types';

// key represents the name of parent input element that other input elements rely on
// the value represents an array of disabled elements IF the given key is inValid
// all disabled elements are considered child inputs and MUST COME AFTER than the key specified (parent)
type ConditionalDisabled = {
    [ name: string ]: string[];
}

type CheckFormStatus = ( checkDisabled: boolean ) => void;

type Content = {
    label?: string;
    value?: string;
    placeholder?: string;
}

type TextInputConfig = {
    onChange: SetFormData;
    content: Content;
    checkFormStatus: CheckFormStatus;
    disabled?: boolean;
    isParentDisabled?: boolean;
    autoFocus?: boolean;
}

type FieldSetConfig = {
    formData: FormData;
    onChange: SetFormData;
    expandedConditionalDisabled: ConditionalDisabled;
    checkFormStatus?: CheckFormStatus;
    disabled?: boolean;
    isParentDisabled?: boolean;
}

export {
    ConditionalDisabled,
    CheckFormStatus,
    TextInputConfig,
    FieldSetConfig,
}