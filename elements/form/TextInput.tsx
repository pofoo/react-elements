// dependencies
import { useEffect, useState, ChangeEvent } from 'react';
// lib
import { toTitleCase } from '../../lib';
// types
import type { SetFormData, ConditionalProps } from 'types';

/* CONSTANTS */
const EMAIL_VALIDATION = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
// TO-DO - come up with password validation
const PASSWORD_VALIDATION = /^/;

/* TYPES */
// TO-DO - implement Conditional Props
interface Content {
    label?: string;
    placeholder?: string;
    value?: string;
}

export interface Props {
    // customization
    id?: string;
    className?: string;
    name?: string;
    content?: Content;
    type: 'email' | 'username' | 'text' | 'password';
    // event handlers
    onChange?: SetFormData;
    checkFormStatus?: ( checkDisabled: boolean ) => void;
    // states
    required?: boolean;
    disabled?: boolean;
    autoFocus?: boolean;
    isParentDisabled?: boolean; // whether other input relies on this input for its disabled attribute
    // limitations
    pattern?: RegExp; // will override default pattern checking from type specification
    maxLength?: number;
}

/**
 * Text Input.
 */
const TextInput = ( {
    id,
    className='',
    content={},
    name,
    type,
    onChange,
    checkFormStatus,
    required,
    disabled=false,
    autoFocus=false,
    isParentDisabled,
    // TO-DO - find an appropriate maxLength
    pattern,
    maxLength=1000,
    ...rest
}: Props ) => {

    // look into datalist
    /* CONTENT */
    const { label, placeholder, value='' } = content;

    // by default we assume parameters for type='text'
    let inputID = id;
    let inputType = type;
    let inputName = name;
    let inputLabel = label;
    let inputPlaceholder = placeholder;
    let inputRequired = required;

    if ( type === 'username' || type === 'email' || type ==='password' ) {
        inputID = id !== undefined ? id : type;
        inputType = type === 'username' ? 'text' : type;
        inputName = name !== undefined ? name : type;
        inputLabel = label !== undefined ? label : toTitleCase( type );
        inputPlaceholder = placeholder !== undefined ? placeholder : toTitleCase( type );
        inputRequired = required !== undefined ? required : true;
    }
    if ( type === 'text' )
        inputRequired = required !== undefined ? required : false;

    /* ERRORS */
    // TO-DO - factor this out to another function
    if ( inputID === undefined )
        throw( SyntaxError( 'If type is text, an ID must be provided for the input' ) );

    if ( inputName === undefined )
        throw( SyntaxError( 'If type is text, a name must be provided for the input' ) );

    if ( inputLabel === undefined || inputPlaceholder == undefined )
        throw( SyntaxError( 'If type is text, a label and placeholder within the content prop must be provided for the input' ) );

    if ( onChange === undefined )
        throw( SyntaxError( 'onChange function not specified - use built in Form wrapper component' ) );

    if ( checkFormStatus === undefined )
        throw( SyntaxError( 'checkFormStatus function not specified - use built in Form wrapper component' ) );

    /* HOOKS */
    const [ touched, setTouched ] = useState<boolean>( false ); 
    const [ isValid, setIsValid ] = useState<boolean>( !inputRequired );

    /* FUNCTIONS */  
    const handleChange = ( event: ChangeEvent<HTMLInputElement> ) => {
        const value = event.target.value;
        const newValid = inputRequired ? checkValid( value ) : true;

        onChange( ( state ) => {
            return {
                ...state,
                [ event.target.name ]: {
                    value,
                    isValid: newValid,
                },
            }
        } );

        setIsValid( newValid );
    }

    // assumes the input is required
    const checkValid = ( value: string ) => {
        if ( pattern ) 
            return pattern.test( value );
        else if ( inputType === 'email' ) 
            return EMAIL_VALIDATION.test( value );
        else if ( inputType === 'password' )
            return PASSWORD_VALIDATION.test( value );
        else
            return value !== '';
    }

    /* CLASSNAMES */
    const textInputWrapperClasses = `
        text-input-wrapper
        ${type}
        ${className}
    `;

    const textInputClasses = `
        text-input
        ${touched && !isValid ? 'not-valid' : 'valid'}
        ${inputType}
    `;

    // check the form status everytime isValid changes
    useEffect( () => {
        checkFormStatus( isParentDisabled ? isParentDisabled : false );
    }, [ isValid ] );

    return (
        <div className={textInputWrapperClasses}>
            <label className='label' htmlFor={inputID}>{inputLabel}</label>
            <input id={inputID} className={textInputClasses} type={inputType}
                onChange={handleChange} onBlur={() => setTouched( true )}
                name={inputName} value={value} placeholder={inputPlaceholder}
                required={inputRequired} disabled={disabled} autoFocus={autoFocus}
                maxLength={maxLength} {...rest} />
        </div>
    )
}

export default TextInput;