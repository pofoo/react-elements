/* TYPES */
interface DiamondProps {
    // customization
    className?: string;
    // states
    isActive?: boolean;
    // accessibility
    ariaLabel: string;
}

/**
 * Diamond Icon
 */
const Diamond = ( { 
    className,
    isActive,
    ariaLabel,
}: DiamondProps ) => {

    const diamondWrapperClasses = `
        ${className}
        chevron-wrapper
    `;

    const diamondClasses = `
        diamond
        ${isActive}
    `;

    return (
        <span className={diamondWrapperClasses}>
            <span className={diamondClasses} aria-label={ariaLabel} />
        </span>
    )
}

export default Diamond;