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
    ariaPressed: boolean;
    ariaHasPopup: boolean;
    ariaLabel: string;
}   

const AccessibleButton: FC<Props> = ( { 
    children,
    className,
    onClick,
    ariaHasPopup=true,
    ariaLabel,
} ) => {

    /* HOOKS */
    const [ pressed, setPressed ] = useState( false )

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