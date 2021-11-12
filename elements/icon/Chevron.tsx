/* TYPES */
interface ChevronProps {
    // customization
    className?: string;
    direction?: 'left' | 'right' | 'up' | 'down';
    background?: 'square' | 'circle';
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
    background,
    isActive,
    ariaLabel,
}: ChevronProps ) => {

    const chevronWrapperClasses = `
        chevron-wrapper
        ${className}
        ${background}
    `;

    const chevronClasses = `
        chevron
        ${direction}
        ${isActive && 'active'}
    `;

    return (
        <span className={chevronWrapperClasses}>
            <span className={chevronClasses} aria-label={ariaLabel} />
        </span>
    )
}

export default Chevron;