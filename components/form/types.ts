// types
import type { SetFormData, FormData } from '../../types';
import type { Props as DependentInputsProps } from './DependentInputs';
import type { Props as FieldSetProps } from './FieldSet';
import type { CheckValid } from './checkValid';
import type { OnSubmit as FormOnSubmit } from './Form';

// key represents the name of parent input element that other input elements rely on
// the value represents an array of disabled elements IF the given key is inValid
// all disabled elements are considered child inputs and MUST COME AFTER than the key specified (parent)
type ConditionalDisabled = {
    [ name: string ]: string[];
}

type InitialValues = {
    [ name: string ]: string;
}

type DisabledInputs = Set<string>;

type CheckFormStatus = ( checkDisabled: boolean ) => void;

interface Content {
    label?: string;
    value?: string;
    placeholder?: string;
}

interface TextInputConfig {
    onChange: SetFormData;
    content: Content;
    checkFormStatus: CheckFormStatus;
    checkValid: CheckValid;
    isValid: boolean;
    disabled?: boolean;
    isParentDisabled?: boolean;
    autoFocus?: boolean;
}

interface FieldSetConfig {
    formData: FormData;
    onChange: SetFormData;
    expandedConditionalDisabled: ConditionalDisabled;
    checkFormStatus: CheckFormStatus;
    disabled?: boolean;
    isParentDisabled?: boolean;
}

interface DependentInputsConfig {
    formData: FormData;
    conditionalDisabled: ConditionalDisabled;
    disabledInputs: DisabledInputs;
    onChange: SetFormData;
    checkFormStatus: CheckFormStatus;
}

export type {
    ConditionalDisabled,
    InitialValues,
    DisabledInputs,
    CheckFormStatus,
    TextInputConfig,
    FieldSetConfig,
    DependentInputsConfig,
    DependentInputsProps,
    FieldSetProps,
    CheckValid,
    FormOnSubmit,
}