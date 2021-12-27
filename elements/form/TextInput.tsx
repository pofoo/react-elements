// dependencies
import { useEffect, useState, ChangeEventHandler, ChangeEvent } from 'react';
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
    checkFormStatus?: ( checkDisabled: boolean ) => void;
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
    const inputName = ( type === 'email' || type ==='username' ) 
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
    const handleChange = ( event: ChangeEvent<HTMLInputElement> ) => {
        const value = event.target.value;
        const newValid = required ? checkValid( value ) : true;

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
        else if ( type === 'email' ) 
            return EMAIL_VALIDATION.test( value );
        else
            return value !== '';
    }

    /* CLASSNAMES */
    const textInputWrapperClasses = `
        text-input-wrapper
        ${type}
    `;

    const textInputClasses = `
        text-input
        ${touched && !isValid ? 'not-valid' : 'valid'}
        ${className}
    `;

    // check the form status everytime isValid changes
    useEffect( () => {
        checkFormStatus( isParentDisabled ? isParentDisabled : false );
    }, [ isValid ] );

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