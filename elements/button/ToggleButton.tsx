// dependencies
import { FC, MouseEvent } from 'react';

/* TYPES */
interface AriaLabel {
    pressedLabel: string;
    notPressedLabel: string;
}

interface Props {
    // customization
    id?: string;
    className?: string;
    // event handlers
    onClick: ( event: MouseEvent<HTMLButtonElement> ) => void;
    // accessibility
    ariaLabel: AriaLabel | string;
    isPressed: boolean;
    ariaHasPopup?: boolean;
}   

/**
 * Buttons that toggle states - for example, showing more information onClick.
 * Because Toggle Buttons can vary in size and styling, this element does not specifiy a content field.
 * Instead, children will be rendered.
 */
const ToggleButton: FC<Props> = ( { 
    children,
    id='',
    className='',
    onClick,
    ariaLabel,
    isPressed,
    ariaHasPopup=true,
    ...rest
} ) => {

    let label;
    if ( typeof ariaLabel !== 'string' ) {
        label = isPressed ? ariaLabel.pressedLabel : ariaLabel.notPressedLabel;
    }
    else {
        label = ariaLabel;
    }

    /* CLASSNAMES */
    const buttonClasses = `
        icon-button-wrapper
        ${className}
    `;

    return (
        <button id={id} className={buttonClasses} onClick={onClick} type='button'
            aria-pressed={isPressed} aria-haspopup={ariaHasPopup} aria-label={label}
            {...rest}>
            {children}
        </button>
    );
}

export default ToggleButton;