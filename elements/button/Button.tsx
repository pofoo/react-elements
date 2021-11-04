// types
import { MouseEvent } from 'react';

/* TYPES */
interface Content {
    text: string;
}

interface ButtonProps {
    className?: 'hollow' | 'filled' | 'outline' | string;
    content: Content;
    onClick: ( event: MouseEvent<HTMLButtonElement> ) => void;
    isDisabled?: boolean;
    type?: 'submit' | 'reset';
    size: 'sm' | 'md' | 'lg';
    color: 'green' | 'purple' | 'blue';
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
    isDisabled=false,
    type='submit',
    size,
    color,
}: ButtonProps ) => {

    /* CLASSNAMES */
    const buttonClasses = `
        button-wrapper
        ${className}
        button--${color}
        button--${size}
        ${isDisabled && 'button--disabled'}
    `;

    return (
        <button className={buttonClasses} 
            onClick={onClick} disabled={isDisabled}
            type={type}>
            {text}
        </button>
    );
}

export default Button;