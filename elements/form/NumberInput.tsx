// dependencies
import { useState } from 'react';

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
    type?: 'tel' | 'number';
    // states
    isRequired?: true;
}

const NumberInput = ( {
    id,
    className='',
    content,
    type='tel',
    isRequired=true,
}: Props ) => {

    /* CONTENT */
    const { label, value='', placeholder='' } = content;

    /* HOOKS */
    const [ input, setInput ] = useState<string>( value );

    /* CLASSNAMES */
    const numberInputWrapperClasses = `
        number-input-wrapper
        ${className}
    `; 

    const numberInputClasses = `
        number-input
        ${className}
    `;

    return (
        <div className={numberInputWrapperClasses}>
            <label htmlFor={id}>{label}</label>
            <input id={id} className={numberInputClasses} type={type}
                name={type} value={input} placeholder={placeholder}
                required={isRequired} />
        </div>
    )
}

export default NumberInput;