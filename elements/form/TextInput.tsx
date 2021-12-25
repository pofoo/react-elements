// dependencies
import { useEffect, useState, ChangeEventHandler, ChangeEvent, useCallback } from 'react';
import { useDebouncedCallback } from 'use-debounce';
// types
import { SetState, FormData } from 'types';

/* CONSTANTS */
const EMAIL_VALIDATION = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PHONE_VALIDATION = /^/;

/* TYPES */
type OnChange = ChangeEventHandler<HTMLInputElement>;

interface Content {
    label: string;
    name: string;
    value?: string;
    placeholder?: string;
}

interface Props {
    // customization
    id: string;
    className?: string;
    content: Content;
    type: 'email' | 'username' | 'text';
    // event handlers
    onChange: SetState<FormData>;

    // states
    required?: boolean;
    disabled?: boolean;
    autoFocus?: boolean;
    // limitations
    maxLength?: number;
}

/* FUNCTIONS */
const checkValid = () => {
    return false;
}

/**
 * Text Input.
 */
const TextInput = ( {
    id,
    className='',
    content,
    type,
    onChange,
    required=false,
    disabled=false,
    autoFocus=false,
    // TO-DO - find an appropriate maxLength
    maxLength=1000,
    ...rest
}: Props ) => {

    // check is type is username
    // look into datalist

    /* CONTENT */
    const { label, name, value='', placeholder='', } = content;

    /* HOOKS */
    const [ input, setInput ] = useState<string>( value );
    const [ touched, setTouched ] = useState<boolean>( false ); 
    const [ isValid, setIsValid ] = useState<boolean>( !required );

    /* FUNCTIONS */
    const handleChange = ( event: ChangeEvent<HTMLInputElement> ) => {
        const value = event.target.value;
        // set TextInput value
        setInput( value );
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

    const init = () => {

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

    // CHECK VALIDITIY
    useEffect( () => {
        init();
    }, [] );

    return (
        <div className={textInputWrapperClasses}>
            <label className='label' htmlFor={id}>{label}</label>
            <input id={id} className={textInputClasses} type='text' 
                onChange={handleChange} onBlur={() => setTouched( true )}
                name={name} value={input} placeholder={placeholder}
                required={required} disabled={disabled} autoFocus={autoFocus}
                maxLength={maxLength} {...rest} />
        </div>
    )
}

export default TextInput;