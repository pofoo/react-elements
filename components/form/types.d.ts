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
    autoFocus?: boolean;
}

// key represents the parent input element that other input elements rely on
// the value represents an array of disabled elements
// all disabled elements are considered child inputs and MUST BE greater than the key specified (parent)
// number is in reference to the DOM strcture of the input elements
type ConditionalDisabled = {
    [ key: number ]: number[];
}

export {
    InputProps,
    ConditionalDisabled,
}