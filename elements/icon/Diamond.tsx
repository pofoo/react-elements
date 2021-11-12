/* TYPES */
interface DiamondProps {
    // customization
    className?: string;
    // states
    isActive?: boolean;
    // accessibility
    ariaLabel: string;
    isPresentation?: boolean;
}

/**
 * Diamond Icon
 */
const Diamond = ( { 
    className,
    isActive,
    ariaLabel,
    isPresentation,
}: DiamondProps ) => {

    const diamondWrapperClasses = `
        ${className}
        diamond-wrapper
    `;

    const diamondClasses = `
        diamond
        ${isActive && 'active'}
    `;

    return (
        <span className={diamondWrapperClasses}>
            <span className={diamondClasses} 
                role={isPresentation ? 'presentation' : ''} aria-label={ariaLabel} />
        </span>
    )
}

export default Diamond;