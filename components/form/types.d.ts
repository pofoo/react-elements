// types
import type { SetFormData, FormData } from '../../types';

type Content = {
    label?: string;
    value?: string;
    placeholder?: string;
}

type CheckFormStatus = ( checkDisabled: boolean ) => void;

type SharedConfig = {
    disabled?: boolean;
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
    checkFormStatus?: CheckFormStatus;
    disabled?: boolean;
    isParentDisabled?: boolean;
}

// key represents the parent input element that other input elements rely on
// the value represents an array of disabled elements
// all disabled elements are considered child inputs and MUST BE greater than the key specified (parent)
// number is in reference to the DOM strcture of the input elements
type ConditionalDisabled = {
    [ key: number ]: number[];
}

export {
    CheckFormStatus,
    SharedConfig,
    TextInputConfig,
    FieldSetConfig,
    ConditionalDisabled,
}