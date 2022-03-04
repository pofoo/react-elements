// dependencies
import { useState, useRef, useEffect } from 'react';
// installed components
import TextareaAutosize from 'react-textarea-autosize';
// elements
import Required from './Required';
// hooks
import { useAfterEffect } from '../../hooks'
// types
import type { SetFormData, FormData } from 'types';
import type { TextareaCache, InputFlexOnChange } from './types';
import type { ChangeEvent } from 'react';
import type { FormFocusedInput, CheckFormStatus } from '../../components/types';


/* TYPES */
interface Content {
    label: string;
    value?: string;
    placeholder?: string;
}

interface Props {
    // customization
    id: string;
    className?: string;
    content: Content;
    name: string;
    isInForm?: boolean;
    // states
    isValid?: boolean;
    required?: boolean;
    resizable?: boolean;
    autoFocus?: boolean;
    isParentDisabled?: boolean; // whether other input relies on this input for its disabled attribute
    disabled?: boolean;
    readOnly?: boolean;
    focusedInput?: FormFocusedInput;
    // event handlers
    checkFormStatus?: CheckFormStatus;
    onChange?: SetFormData | InputFlexOnChange;
    cache?: TextareaCache;
    // limitations
    minLength?: number;
    maxLength?: number;
    minRows?: number;
    maxRows?: number;
    noEmptyVal?: boolean; // if true, no empty strings are permitted 
    // styling
    isRounded?: boolean;
    showRequired?: boolean;
}

/**
 * Textarea
 * TO-DO:
 * 1. 
 */
const Textarea = ( {
    id,
    className='',
    content,
    name,
    isInForm=true,
    required,
    resizable=false,
    isValid,
    autoFocus,
    isParentDisabled,
    disabled,
    readOnly,
    focusedInput,
    checkFormStatus,
    onChange,
    cache,
    minLength,
    maxLength,
    minRows=2,
    maxRows,
    noEmptyVal=true,
    isRounded=true,
    showRequired=true,
}: Props ) => {
    /* ERRORS */
    if ( onChange === undefined && cache === undefined )
        throw( SyntaxError( 'Both onChange function and cache not specified - use built in Form wrapper component OR specify your own custom onChange function or cache' ) );

    /* CONTENT */
    const { label, placeholder='', value } = content;

    /* HOOKS */
    const ref = useRef<HTMLTextAreaElement>( null );
    const [ actualPlaceholder, setActualPlaceholder ] = useState<string>( placeholder );

    /* FUNCTIONS */
    const handleChange = ( event: ChangeEvent<HTMLTextAreaElement> ) => {
        const newValue = event.target.value;

        if ( isInForm ) {
            const newInputData = {
                [ name ]: {
                    value: newValue,
                    isValid: noEmptyVal ? newValue?.trim() !== '' : newValue !== '',
                }
            }

            if ( onChange ) {
                const setFormData = onChange as SetFormData;

                setFormData( ( state ) => {
                    return {
                        ...state,
                        ...newInputData,
                    }
                } );
            }
            if ( cache ) {
                cache.updateCache( {
                    ...cache.formData as FormData,
                    ...newInputData,
                } );
            }
        }
        else {
            if ( onChange ) {
                const changeFn = onChange as InputFlexOnChange;
                changeFn( newValue );
            }
            if ( cache )
                cache.updateCache( newValue );
        }
    }

    const handleBlur = () => {
        setActualPlaceholder( placeholder );
    }

    const handleFocus = () => {
        setActualPlaceholder( '' );
        if ( focusedInput )
            focusedInput.current = ref.current;
    }


    /* CLASSNAMES */
    const textareaWrapperClasses = `
        input-wrapper
        textarea-wrapper
        ${required ? 'required' : 'not-required'}
        ${disabled ? 'disabled' : 'not-disabled'}
        ${className}
    `;

    const textareaClasses = `
        input
        textarea
        ${readOnly ? 'read-only' : 'not-read-only'}
        ${resizable ? 'resizable' : 'not-resizable'}
        ${isRounded ? 'rounded' : ''}
    `;

    useEffect( () => {
        if ( isInForm && autoFocus && focusedInput )
            focusedInput.current = ref.current;
    }, [] );

    // check the form status everytime isValid changes EXCEPT on initial render
    useAfterEffect( () => {
        if ( isInForm && checkFormStatus )
            checkFormStatus( isParentDisabled ? isParentDisabled : false );
    }, [ isValid ] );

    return (
        <div className={textareaWrapperClasses}>
            <label htmlFor={id} className='label'>
                {label}
                {
                    showRequired && required && (
                        <Required />
                    )
                }
            </label>
            <TextareaAutosize ref={ref} name={name} id={id} 
                className={textareaClasses} placeholder={actualPlaceholder} 
                value={value} autoFocus={autoFocus} required={required} 
                disabled={disabled} onChange={handleChange} 
                minRows={minRows} maxRows={maxRows}
                minLength={minLength} maxLength={maxLength}
                onBlur={handleBlur} onFocus={handleFocus}
                readOnly={readOnly} />
        </div>
    )
}

export default Textarea;