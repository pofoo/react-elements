// dependencies
import { useRef, useEffect } from 'react';

/* CONSTANTS */
const EMAIL_VALIDATION = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PHONE_VALIDATION = /^/;

/* TYPES */
interface Props {
    className?: string;
}

const TextInput = ( {
    className='',
}: Props ) => {

    /* HOOKS */
    const ref = useRef<HTMLInputElement>( null );

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
        <input ref={ref} className={textInputClasses} type='text'/>
    )
}

export default TextInput;