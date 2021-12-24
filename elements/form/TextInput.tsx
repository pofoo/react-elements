// dependencies
import { useRef, useEffect, useState, FormEvent } from 'react';
// types
import { SetState } from 'types';

/* CONSTANTS */
const EMAIL_VALIDATION = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PHONE_VALIDATION = /^/;

/* TYPES */
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
    // states
    autoFocus?: boolean;
    disabled?: boolean;
    // limitations
    maxLength?: number;
}

/**
 * Text Input.
 */
const TextInput = ( {
    id,
    className='',
    content,
    type,
    autoFocus=false,
    disabled=false,
    // TO-DO - find an appropriate maxLength
    maxLength=1000,
    ...rest
}: Props ) => {

    // check is type is username
    // look into datalist

    /* CONTENT */
    const { label, name, value='', placeholder='', } = content;

    /* HOOKS */
    const ref = useRef<HTMLInputElement>( null );
    const [ input, setInput ] = useState<string>( value );

    /* FUNCTIONS */
    const handleInput = ( event: FormEvent<HTMLInputElement> ) => {
        setInput( event?.target?.value );
    }

    /* CLASSNAMES */
    const textInputWrapperClasses = `
        text-input-wrapper
        ${type}
    `;

    const textInputClasses = `
        text-input
        ${className}
    `;

    // CHECK VALIDITIY
    useEffect( () => {
        const target = ref.current as HTMLInputElement;

        target.addEventListener( 'input', () => {} );

        return () => {
            target.removeEventListener( 'input', () => {} );
        }
    }, [] );

    return (
        <div className={textInputWrapperClasses}>
            <label className='label' htmlFor={id}>{label}</label>
            <input ref={ref} id={id} className={textInputClasses} type='text' 
                name={name} value={input} placeholder={placeholder}
                disabled={disabled} autoFocus={autoFocus}
                maxLength={maxLength}
                {...rest} />
        </div>
    )
}

export default TextInput;