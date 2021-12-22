// dependencies
import { useRef, useEffect } from 'react';

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