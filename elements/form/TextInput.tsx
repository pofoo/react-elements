// dependencies
import { useState, useRef, ChangeEvent, useEffect } from 'react';
// hooks
import { useAfterEffect } from '../../hooks';
// lib
import { toTitleCase } from '../../lib';
// types
import type { FormData, SetFormData, ConditionalProps } from 'types';
import type { TextInputTypes } from './types';
// elements
import { Blurb } from '../../elements';
// partials
import Required from './Required';
import { handleTextInputValidityMessages } from './handleValidityMessages';
// constants
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from './constants';

/* TYPES */
// TO-DO - implement Conditional Props

interface Content {
    label?: string;
    value?: string;
    placeholder?: string;
}

interface Match {
    value: string;
    type?: string;
}

export interface Props {
    // customization
    id?: string;
    className?: string;
    name?: string;
    content?: Content;
    type: TextInputTypes;
    // event handlers
    onChange?: SetFormData;
    checkFormStatus?: ( checkDisabled: boolean ) => void;
    // states
    required?: boolean;
    disabled?: boolean;
    autoFocus?: boolean;
    isParentDisabled?: boolean; // whether other input relies on this input for its disabled attribute
    match?: string; // if match is specfied, this input MUST equal the match string
    // limitations
    pattern?: RegExp; // will override default pattern checking from type specification
    maxLength?: number;
    // styling
    isRounded?: boolean;
    showValid?: boolean;
    animateNotValid?: boolean;
}

// matching 2 passwords
// matching 2 different input types
// matching 2 of the same input types



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
    match,
    // TO-DO - find an appropriate maxLength
    pattern,
    maxLength=1000,
    isRounded=true,
    showValid=true,
    animateNotValid=true,
    ...rest
}: Props ) => {

    // look into datalist
    /* CONTENT */
    const { label, placeholder='', value='' } = content;

    // by default we assume parameters for type='text'
    let inputID = id;
    let inputType = type;
    let inputName = name;
    let inputLabel = label;
    let inputPlaceholder  = placeholder;
    let inputRequired = required;
    // TO-DO - strip pattern regex to become an input string
    const inputPattern = pattern;

    if ( type === 'username' || type === 'email' || type ==='password' ) {
        inputID = id !== undefined ? id : type;
        inputType = type === 'username' ? 'text' : type;
        inputName = name !== undefined ? name : type;
        inputLabel = label !== undefined ? label : toTitleCase( type );
        inputRequired = required !== undefined ? required : true;

        if ( type === 'username' ) 
            inputPlaceholder = 'doggie69'
        else if ( type === 'email' )
            inputPlaceholder = 'example@website.com'
        else if ( type === 'password' )
            inputPlaceholder = '********';
    }
    else if ( type === 'text' ) {
        inputID = id !== undefined ? id : name;
        inputRequired = required !== undefined ? required : false;
    }

    /* ERRORS */
    if ( inputID === undefined )
        throw( SyntaxError( 'If type is text, an ID must be provided for the input' ) );

    if ( inputName === undefined )
        throw( SyntaxError( 'If type is text, a name must be provided for the input' ) );

    if ( onChange === undefined )
        throw( SyntaxError( 'onChange function not specified - use built in Form wrapper component' ) );

    if ( checkFormStatus === undefined )
        throw( SyntaxError( 'checkFormStatus function not specified - use built in Form wrapper component' ) );

    /* FUNCTIONS */  
    const handleChange = ( event: ChangeEvent<HTMLInputElement> ) => {
        const value = event.target.value;
        const newValid = inputRequired ? checkValid( value ) : true;

        onChange( ( state: FormData ) => {
            return {
                ...state,
                [ event.target.name ]: {
                    value,
                    isValid: newValid,
                },
            }
        } );

        setIsValid( newValid );
        handleValidityMessages();
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

    const handleBlur = () => {
        setTouched( true );
        setFocused( false );
        setActualPlaceholder( originalPlaceholder.current );
    }

    const handleFocus = () => {
        setFocused( true );
        setActualPlaceholder( '' );
    }

    const handleValidityMessages = () => {
        if ( inputRequired ) {
            const target = inputRef.current as HTMLInputElement;
    
            handleTextInputValidityMessages( target );
        }
    }

    /* HOOKS */
    const inputRef = useRef<HTMLInputElement>( null );
    const originalPlaceholder = useRef<string>( inputPlaceholder );
    const [ touched, setTouched ] = useState<boolean>( false ); 
    const [ focused, setFocused ] = useState<boolean>( autoFocus ? true : false );
    const [ isValid, setIsValid ] = useState<boolean>( 
        value === '' ? !inputRequired : checkValid( value ) );
    const [ actualPlaceholder, setActualPlaceholder ] = useState<string>( 
        originalPlaceholder.current );

    /* CLASSNAMES */
    const isValidClasses = isValid ? 'valid' : 'not-valid';

    const textInputWrapperClasses = `
        input-wrapper
        text-input-wrapper
        ${isRounded ? 'rounded' : ''}
        ${disabled ? 'disabled' : 'not-disabled'}
        ${touched ? 'touched' : 'not-touched'}
        ${inputRequired ? 'required' : 'not-required'}
        ${isValidClasses}
        ${isParentDisabled ? 'parent-conditional' : ''}
        ${focused ? 'focused' : 'not-focused'}
        ${className}
    `;

    const textInputClasses = `
        input
        text-input
        ${animateNotValid ? 'animate-not-valid' : ''}
        ${inputType}
    `;

    /* ACCESSIBILITY */
    const validIconAriaLabel = `${inputName} ${isValidClasses} icon`;

    // check the form status everytime isValid changes EXCEPT on initial render
    useAfterEffect( () => {
        checkFormStatus( isParentDisabled ? isParentDisabled : false );
    }, [ isValid ] );

    useEffect( () => {
        handleValidityMessages();
    }, [] );

    return (
        <div className={textInputWrapperClasses}>
            <label className='label text-input-label' htmlFor={inputID}>
                <div className='text'>
                    {inputLabel}
                    {
                        inputRequired && (
                            <Required />
                        )
                    }
                </div>
                {
                    showValid && (
                        <div className='valid-icon' role='presentation' 
                            aria-label={validIconAriaLabel} aria-hidden={!touched && !focused}>
                            {isValid ? ' ✓' : ' ✖'}
                            {
                                inputRef.current?.validationMessage !== '' &&
                                !isValid && (
                                    <Blurb className='text-input-blurb' 
                                        color={isValid ? 'green' : 'pink'}>
                                        {inputRef.current?.validationMessage}
                                    </Blurb>
                                )
                            }
                        </div>
                    )
                }
            </label>
            <input ref={inputRef} id={inputID} className={textInputClasses} type={inputType}
                onChange={handleChange} onBlur={() => handleBlur()} 
                onFocus={() => handleFocus()} placeholder={actualPlaceholder}
                name={inputName} value={value} required={inputRequired} 
                disabled={disabled} autoFocus={autoFocus} maxLength={maxLength}
                autoComplete='off'
                {...rest} />
        </div>
    )
}

export default TextInput;