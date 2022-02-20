// types
import type { FlexOnChange } from './types';
// installed components
import TextareaAutosize from 'react-textarea-autosize';

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
    name: string;
    // states
    required?: boolean;
    resizable?: boolean;
    // event handlers
    onChange?: FlexOnChange;
    // limitations
    minLength?: number;
    maxLength?: number;
    // styling
    isRounded?: boolean;
}

const Textarea = ( {
    id,
    className='',
    content,
    name,
    required,
    resizable=false,
    onChange,
    minLength,
    maxLength,
    isRounded=true,
}: Props ) => {
    /* ERRORS */
    if ( onChange === undefined )
        throw( SyntaxError( 'onChange function not specified - use built in Form wrapper component OR specify your own custom onChange function' ) );

    /* CONTENT */
    const { label, placeholder='', value='' } = content;

    /* CLASSNAMES */
    const textareaWrapperClasses = `
        textarea-wrapper
        ${className}
    `;

    const textareaClasses = `
        textarea
        ${resizable ? 'resizable' : 'not-resizable'}
        ${isRounded ? 'rounded' : 'not-rounded'}
    `;

    return (
        <div className={textareaWrapperClasses}>
            <label htmlFor={id} className='label'>{label}</label>
            <TextareaAutosize name={name} id={id} className={textareaClasses}
                placeholder={placeholder} value={value}
                required={required} onChange={onChange}
                minLength={minLength} maxLength={maxLength} >
                    <h2>Heloo</h2>
                </TextareaAutosize>
                <textarea>Hello</textarea>
        </div>
    )
}

export default Textarea;