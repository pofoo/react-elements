// dependencies
import { FC, MouseEvent, useState } from 'react';
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
    ariaLabel: AriaLabel;
    ariaHasPopup?: boolean;
    isPressed?: boolean;
}   

/**
 * Buttons that toggle states - for example, showing more information onClick.
 * Because Toggle Buttons can vary in size and styling, this element does not specifiy a content field.
 * Instead, children will be rendered.
 */
const ToggleButton: FC<Props> = ( { 
    children,
    className,
    onClick,
    ariaLabel: {
        pressedLabel,
        notPressedLabel,
    },
    ariaHasPopup=true,
    isPressed=false
} ) => {

    /* HOOKS */
    const [ pressed, setPressed ] = useState<boolean>( isPressed )

    /* FUNCTIONS */
    const onPress = ( event: MouseEvent<HTMLButtonElement> ) => {
        onClick( event );
        setPressed( ( pressed ) => !pressed );
    }

    /* CLASSNAMES */
    const buttonClasses = `
        icon-button-wrapper
        ${className}
    `;

    // 
    return (
        <button className={buttonClasses} onClick={onPress} type='button'
            aria-pressed={pressed} aria-haspopup={ariaHasPopup} aria-label={pressed ? pressedLabel : notPressedLabel}>
            {children}
        </button>
    );
}

export default ToggleButton;