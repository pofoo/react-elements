// types
import { MouseEvent } from 'react';

/* TYPES */
interface Content {
    text: string;
}

interface ButtonProps {
    className?: string;
    content: Content;
    onClick: ( event: MouseEvent<HTMLButtonElement> ) => void;
    type?: 'submit' | 'reset';
}

/**
 * Submit and Reset Button for Forms
 */
const Button = ( {
    className,
    content: {
        text,
    },
    onClick,
    type='submit',
}: ButtonProps ) => {

    /* CLASSNAMES */
    const buttonClasses = `
        button-wrapper 
        ${className}
    `;

    return (
        <button className={buttonClasses} onClick={onClick} type={type}>
            {text}
        </button>
    );
}

export default Button;