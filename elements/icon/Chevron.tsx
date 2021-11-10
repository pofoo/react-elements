/* TYPES */
interface ChevronProps {
    className?: string;
    direction?: 'left' | 'right' | 'up' | 'down';
    ariaLabel: string;
}

/**
 * Chevron Icon
 */
const Chevron = ( { 
    className,
    direction='right',
    ariaLabel,
}: ChevronProps ) => {

    const chevronWrapperClasses = `
        ${className}
        chevron-wrapper
    `;

    const chevronClasses = `
        chevron
        ${direction}
    `;

    return (
        <span className={chevronWrapperClasses}>
            <span className={chevronClasses} aria-label={ariaLabel} />
        </span>
    )
}

export default Chevron;