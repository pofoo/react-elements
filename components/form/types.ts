// types
import type { MutableRefObject } from 'react';
import type { SetFormData, FormData } from '../../types';
import type { Props as DependentInputsProps } from './DependentInputs';
import type { Props as FieldSetProps } from './FieldSet';
import type { CheckValid } from './checkValid';
import type { OnSubmit as FormOnSubmit } from './Form';
import type { PromiseExtended } from 'dexie';
import type { InputCache } from '../../elements/types';

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

type FocusedInput = MutableRefObject<HTMLInputElement| null>;

type GetCache = <T extends object>() => PromiseExtended<
    ( FormData<T> ) | undefined>;
type UpdateCache = <T extends object>( data: FormData<T> ) => Promise<any>;
type ClearCache = () => PromiseExtended<void>;

interface CacheFunctions {
    getCache: GetCache;
    updateCache: UpdateCache;
    clearCache: ClearCache;
}

interface Content {
    label?: string;
    value?: string;
    placeholder?: string;
}

interface TextInputConfig {
    onChange?: SetFormData;
    content: Content;
    checkFormStatus: CheckFormStatus;
    checkValid: CheckValid;
    isValid: boolean;
    cache?: InputCache;
    focusedInput?: FocusedInput;
    disabled?: boolean;
    isParentDisabled?: boolean;
    autoFocus?: boolean;
    resetTouched?: true;
}

interface FieldSetConfig {
    formData?: FormData;
    onChange?: SetFormData;
    expandedConditionalDisabled: ConditionalDisabled;
    checkFormStatus: CheckFormStatus;
    cache?: InputCache;
    disabled?: boolean;
    isParentDisabled?: boolean;
    focusedInput?: FocusedInput;
}

interface DependentInputsConfig {
    formData?: FormData;
    conditionalDisabled: ConditionalDisabled;
    disabledInputs: DisabledInputs;
    onChange?: SetFormData;
    checkFormStatus: CheckFormStatus;
    cache?: InputCache;
    focusedInput?: FocusedInput;
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
    FocusedInput,
    CacheFunctions,
    GetCache,
    UpdateCache,
}