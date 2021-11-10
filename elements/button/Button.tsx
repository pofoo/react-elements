// partials
import Ripple from './Ripple';
// types
import { MouseEvent } from 'react';
// import { Colors } from 'types';

/* TYPES */
interface Content {
    text: string;
}

interface ButtonProps {
    className?: string;
    content: Content;
    onClick: ( event: MouseEvent<HTMLButtonElement> ) => void;
    isDisabled?: boolean;
    isLoading?: boolean;
    type?: 'submit' | 'reset';
    size?: 'sm' | 'md' | 'lg';
    color?: 'green' | 'blue' | 'yellow' | 'orange' | 'purple' | 'pink';
    fillType?: 'gradient';
    hoverType?: 'lift' | 'press' | 'pulse' | 'glimmer';
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
    isLoading=false,
    type='submit',
    size='md',
    color='green',
    fillType,
    hoverType='lift',
}: ButtonProps ) => {

    /* CLASSNAMES */
    const buttonClasses = `
        button-wrapper
        ${className}
        ${isLoading && 'loading'}
        button--${color}
        button--${size}
        ${isDisabled && 'button--disabled'}
        ${fillType}
        ${hoverType}
    `;

    return (
        <button className={buttonClasses} 
            onClick={onClick} disabled={isDisabled}
            type={type}>
            {text}
            <Ripple />
        </button>
    );
}

export default Button;