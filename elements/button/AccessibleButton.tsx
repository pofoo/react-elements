// dependencies
import { FC, MouseEvent, useState } from 'react';
// types
import { EventFunction } from 'types';


/* TYPES */
interface Props {
    // styling
    className?: string;
    // event handlers
    onClick: EventFunction;
    // accessibility
    ariaLabel: string;
    ariaHasPopup?: boolean;
    isPressed?: boolean;
}   

/**
 * Accessible Buttons that include aria labels
 * Used for Icon Buttons
 */
const AccessibleButton: FC<Props> = ( { 
    children,
    className,
    onClick,
    ariaLabel,
    ariaHasPopup=true,
    isPressed=false
} ) => {

    /* HOOKS */
    const [ pressed, setPressed ] = useState<boolean>( isPressed )

    /* FUNCTIONS */
    const onPress = ( event: MouseEvent ) => {
        onClick( event );
        setPressed( ( pressed ) => !pressed );
    }

    /* CLASSNAMES */
    const buttonClasses = `
        icon-button-wrapper
        ${className}
    `;

    return (
        <button className={buttonClasses} onClick={onPress} type='button'
            aria-pressed={pressed} aria-haspopup={ariaHasPopup} aria-label={ariaLabel}>
            {children}
        </button>
    );
}

export default AccessibleButton;