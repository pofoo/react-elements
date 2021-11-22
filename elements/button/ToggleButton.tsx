// dependencies
import { FC } from 'react';
// types
import { EventFunction } from 'types';

/* TYPES */
interface AriaLabel {
    pressedLabel: string;
    notPressedLabel: string;
}

interface Props {
    // customization
    className?: string;
    // event handlers
    onClick: EventFunction;
    // accessibility
    ariaLabel: AriaLabel | string;
    ariaHasPopup?: boolean;
    isPressed: boolean;
}   

/**
 * Buttons that toggle states - for example, showing more information onClick.
 * Because Toggle Buttons can vary in size and styling, this element does not specifiy a content field.
 * Instead, children will be rendered.
 */
const ToggleButton: FC<Props> = ( { 
    children,
    className='',
    onClick,
    ariaLabel,
    ariaHasPopup=true,
    isPressed,
} ) => {

    let label;
    if ( typeof ariaLabel !== 'string' ) {
        label = isPressed ? ariaLabel.pressedLabel : ariaLabel.notPressedLabel;
    }

    /* CLASSNAMES */
    const buttonClasses = `
        icon-button-wrapper
        ${className}
    `;

    return (
        <button className={buttonClasses} onClick={onClick} type='button'
            aria-pressed={isPressed} aria-haspopup={ariaHasPopup} aria-label={label}>
            {children}
        </button>
    );
}

export default ToggleButton;