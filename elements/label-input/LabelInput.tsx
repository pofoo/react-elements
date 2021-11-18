// dependencies
import { forwardRef, useEffect } from 'react';
// types
import { ForwardedRef, KeyboardEvent, RefObject } from 'react';
import { OnInput, OnKeyDown } from 'types';

/* TYPES */
interface Label {
    className?: string;
    text: string;
    htmlFor: string;
}

interface Input {
    className?: string;
    placeholder?: string;
    type?: 'text'; // TO-DO - this is restrictive now - can change going forward
    onInput: OnInput;
    name: string;
    autocomplete?: 'off'; // TO-DO - look into what other options their are
}

interface Props {
    className?: string;
    label: Label;
    input: Input;
    onEnterKey?: OnKeyDown;
}

const LabelInput = forwardRef<ForwardedRef<HTMLInputElement>, Props>( ( { 
    className,
    label,
    input,
    onEnterKey=(() => {}), // this could save the input to the cache? kind of like the dribbble UI
}, ref ) => {

    /* CLASSNAMES */
    const containerClasses = `
        label-input-wrapper 
        ${className}
    `;
    const labelClasses = `
        label-wrapper 
        ${label?.className}
    `;
    const inputClasses = `
        input-wrapper 
        ${input?.className}
    `;

    useEffect( () => {
        if ( ref?.current != null ) {
            ref.current.addEventListener( 'keypress', ( event: KeyboardEvent ) => onEnterKey( event, ref ) );
            return () => {
                    ref.current.removeEventListener( 'keypress', ( event: KeyboardEvent ) => onEnterKey( event, ref ) );
                }
        }
    }, [] );

    return (
        <div className={containerClasses}>
            <label htmlFor={label.htmlFor} className={labelClasses}>
                <h3>{label.text}</h3>
            </label>
            <input id={label.htmlFor} ref={ref as RefObject<HTMLInputElement>} className={inputClasses}
                type={input.type}
                onInput={input.onInput}
                placeholder={input.placeholder}
                name={input.name}
                autoComplete={input.autocomplete} />
        </div>
    );
} );

export default LabelInput;