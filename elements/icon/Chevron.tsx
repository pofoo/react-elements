/* TYPES */
interface ChevronProps {
    // customization
    className?: string;
    direction?: 'left' | 'right' | 'up' | 'down';
    // states
    isActive?: boolean;
    // accessibility
    ariaLabel: string;
}

/**
 * Chevron Icon
 */
const Chevron = ( { 
    className,
    direction='right',
    isActive,
    ariaLabel,
}: ChevronProps ) => {

    const chevronWrapperClasses = `
        ${className}
        chevron-wrapper
    `;

    const chevronClasses = `
        chevron
        ${direction}
        ${isActive}
    `;

    return (
        <span className={chevronWrapperClasses}>
            <span className={chevronClasses} aria-label={ariaLabel} />
        </span>
    )
}

export default Chevron;