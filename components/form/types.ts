// types
import type { MutableRefObject } from 'react';
import type { FormData, UpdateCache } from '../../types';
import type { Props as DependentInputsProps } from './DependentInputs';
import type { Props as FieldSetProps } from './FieldSet';
import type { CheckValid } from './checkValid';
import type { OnSubmit as FormOnSubmit } from './Form';
import type { HTMLFormElements } from '../../elements/types';


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

type FormFocusedInput = MutableRefObject<HTMLFormElements| null>;

type FormOnChange = ( input: FormData ) => unknown;

interface FormCache {
    updateCache?: UpdateCache;
    cacheFormData?: FormData;
}

interface Content {
    label?: string;
    value?: string;
    placeholder?: string;
}

interface TextInputConfig {
    onChange?: FormOnChange;
    content: Content;
    checkFormStatus: CheckFormStatus;
    checkValid: CheckValid;
    isValid: boolean;
    focusedInput?: FormFocusedInput;
    disabled?: boolean;
    isParentDisabled?: boolean;
    autoFocus?: boolean;
    resetTouched?: true;
}

interface FieldSetConfig {
    formData: FormData;
    onChange: FormOnChange;
    expandedConditionalDisabled: ConditionalDisabled;
    checkFormStatus: CheckFormStatus;
    disabled?: boolean;
    isParentDisabled?: boolean;
    focusedInput?: FormFocusedInput;
}

interface DependentInputsConfig {
    formData: FormData;
    conditionalDisabled: ConditionalDisabled;
    disabledInputs: DisabledInputs;
    onChange: FormOnChange;
    checkFormStatus: CheckFormStatus;
    focusedInput?: FormFocusedInput;
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
    FormFocusedInput,
    FormCache,
    FormOnChange,
}