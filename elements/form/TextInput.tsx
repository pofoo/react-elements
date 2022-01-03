// dependencies
import { useState, useRef, ChangeEvent, useEffect } from 'react';
// hooks
import { useAfterEffect } from '../../hooks';
// lib
import { toTitleCase } from '../../lib';
// types
import type { SetFormData, ConditionalProps } from 'types';
import { TextInputTypes } from './types';
// partials
import Required from './Required';
import { handleTextInputValidityMessages } from './handleValidityMessages';

/* CONSTANTS */
const EMAIL_VALIDATION = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
// TO-DO - come up with password validation
const PASSWORD_VALIDATION = /^/;

/* TYPES */
// TO-DO - implement Conditional Props

interface Content {
    label?: string;
    value?: string;
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
    // limitations
    pattern?: RegExp; // will override default pattern checking from type specification
    maxLength?: number;
    // styling
    isRounded?: boolean;
    showValid?: boolean;
    animateNotValid?: boolean;
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
    isRounded=true,
    showValid=true,
    animateNotValid=true,
    ...rest
}: Props ) => {

    // look into datalist
    /* CONTENT */
    const { label, value='' } = content;

    // by default we assume parameters for type='text'
    let inputID = id;
    let inputType = type;
    let inputName = name;
    let inputLabel = label;
    let inputRequired = required;

    if ( type === 'username' || type === 'email' || type ==='password' ) {
        inputID = id !== undefined ? id : type;
        inputType = type === 'username' ? 'text' : type;
        inputName = name !== undefined ? name : type;
        inputLabel = label !== undefined ? label : toTitleCase( type );
        inputRequired = required !== undefined ? required : true;
    }
    if ( type === 'text' ) {
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
        if ( inputRequired ) 
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
    }

    const handleValidityMessages = () => {
        const target = ref.current as HTMLInputElement;

        handleTextInputValidityMessages( target, inputType );
    }

    /* HOOKS */
    const ref = useRef<HTMLInputElement>( null );
    const [ touched, setTouched ] = useState<boolean>( false ); 
    const [ focused, setFocused ] = useState<boolean>( autoFocus ? true : false );
    const [ isValid, setIsValid ] = useState<boolean>( 
        value === '' ? !inputRequired : checkValid( value ) );

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
        if ( inputRequired ) 
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
                                // TO-DO - render a blurb ONLY IF there is a custom validity message
                            }
                        </div>
                    )
                }
            </label>
            <input ref={ref} id={inputID} className={textInputClasses} type={inputType}
                onChange={handleChange} onBlur={handleBlur} 
                onFocus={() => setFocused( true )} pattern={`${pattern}`}
                name={inputName} value={value} required={inputRequired} 
                disabled={disabled} autoFocus={autoFocus} maxLength={maxLength}
                autoComplete='off'
                {...rest} />
        </div>
    )
}

export default TextInput;