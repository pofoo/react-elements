// elements
import SVG from '../svg';
// partials
import Ripple from './ripple';
// types
import { MouseEvent } from 'react';
// import { Colors } from 'types';

/* TYPES */
interface Content {
    text: string;
    icon?: {
        data: string;
        alt: string;
    }
}

interface Props {
    // customization
    className?: string;
    content: Content;
    // event handlers
    onClick: ( event: MouseEvent<HTMLButtonElement> ) => void;
    // button states / accessibility
    isDisabled?: boolean;
    isLoading?: boolean;
    // styling
    type?: 'submit' | 'reset';
    size?: 'sm' | 'md' | 'lg';
    color?: 'brand-blue' | 'green' | 'blue' | 'yellow' | 'orange' | 'purple' | 'pink';
    fillType?: 'gradient';
    isRounded?: boolean;
    hoverType?: 'lift' | 'press' | 'pulse' | 'glimmer';
    clickType?: 'ripple';
}

/**
 * Submit and Reset Button for Forms.
 */
const FormButton = ( {
    className,
    content,
    onClick,
    isDisabled=false,
    isLoading=false,
    type='submit',
    size='md',
    color='green',
    fillType,
    isRounded=true,
    hoverType='lift',
    clickType,
}: Props ) => {

    /* CONTENT */
    const { text, icon=null } = content;

    // should button--color be the className?
    // or should I have just the color className so it can be reused
    /* CLASSNAMES */
    const buttonClasses = `
        button-wrapper
        ${className}
        ${isLoading && 'loading'}
        ${color}
        button--${size}
        ${isDisabled && 'disabled'}
        ${fillType}
        ${isRounded ? 'rounded' : ''}
        ${hoverType}
        ${clickType !== 'ripple' && clickType}
    `;

    return (
        <button className={buttonClasses} 
            onClick={onClick} disabled={isDisabled}
            type={type}>
            {
                icon && (
                    // TO-DO - adjust width and height depending on button size
                    // use a dummy icon to see how it would look
                    <SVG data={icon.data} alt={icon.alt}
                        width={50} height={50} />
                )
            }
            <span className='button-text'>{text}</span>
            {
                clickType === 'ripple' && (
                    <Ripple />
                )
            }
        </button>
    );
}

export default FormButton;