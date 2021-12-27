// dependencies
import { useState, ChangeEventHandler, ChangeEvent } from 'react';
import { useDebouncedCallback } from 'use-debounce';
// types
import type { SetFormData, ConditionalProps } from 'types';

/* CONSTANTS */
const EMAIL_VALIDATION = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

/* TYPES */
// TO-DO - implement Conditional Props

type OnChange = ChangeEventHandler<HTMLInputElement>;

interface Content {
    label: string;
    value?: string;
    placeholder?: string;
}

interface Props {
    // customization
    id: string;
    className?: string;
    name?: string;
    content: Content;
    type: 'email' | 'username' | 'text';
    // event handlers
    onChange?: SetFormData;
    // TO-DO - test required vs. not required from cloning the element
    checkFormStatus?: ( checkDisabled: boolean ) => void;
    // handleDisabledValues?: any;
    // states
    required?: boolean;
    disabled?: boolean;
    autoFocus?: boolean;
    isParentDisabled?: boolean;
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
    content,
    name,
    type,
    onChange,
    checkFormStatus,
    // handleDisabledValues,
    required=false,
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
    let inputName = ( type === 'email' || type ==='username' ) 
        && typeof name !== undefined ? type : name;
    const { label, value='', placeholder='', } = content;

    /* ERRORS */
    if ( typeof inputName !== 'string' )
        throw( SyntaxError( 'If type is text, a name must be provided as an input' ) );
    if ( typeof onChange !== 'function' )
        throw( SyntaxError( 'onChange function not specified - use built in Form wrapper component' ) );
    if ( typeof checkFormStatus !== 'function' )
        throw( SyntaxError( 'checkFormStatus function not specified - use built in Form wrapper component' ) );

    /* HOOKS */
    const [ touched, setTouched ] = useState<boolean>( false ); 
    const [ isValid, setIsValid ] = useState<boolean>( !required );

    /* FUNCTIONS */
    // POTENTIAL BUG
    const debounceValid = useDebouncedCallback( 
        ( state: boolean ) => setIsValid( state ), 2000 );
    
    const handleChange = ( event: ChangeEvent<HTMLInputElement> ) => {
        const value = event.target.value;
        // TO-DO - debounce this call - ONLY DEBOUNCE THE CLASSNAME ADDING
        // update the isValid state based off the user input
        checkValid();
        // set the parent forms state
        onChange( ( state ) => {
            return {
                ...state,
                [ event.target.name ]: {
                    value,
                    isValid,
                },
            }
        } );
    }

    const checkValid = () => {
        let newValid = true;

        if ( pattern ) 
            newValid = pattern.test( value );
        else if ( type === 'email' ) 
            newValid = EMAIL_VALIDATION.test( value );
        else if ( required )
            newValid = value !== '';
        
        // POTENTIAL BUG
        if ( newValid !== isValid ) {
            // THIS IS NOT WORKING
            checkFormStatus( isParentDisabled ? isParentDisabled : false );
            debounceValid( newValid );
            // setIsValid( newValid );
        }
    }

    /* CLASSNAMES */
    const textInputWrapperClasses = `
        text-input-wrapper
        ${type}
    `;

    const textInputClasses = `
        text-input
        ${!isValid && touched ? 'not-valid' : 'valid'}
        ${className}
    `;

    return (
        <div className={textInputWrapperClasses}>
            <label className='label' htmlFor={id}>{label}</label>
            <input id={id} className={textInputClasses} type='text' 
                onChange={handleChange} onBlur={() => setTouched( true )}
                name={inputName} value={value} placeholder={placeholder}
                required={required} disabled={disabled} autoFocus={autoFocus}
                maxLength={maxLength} {...rest} />
        </div>
    )
}

export default TextInput;