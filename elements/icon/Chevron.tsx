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
    isPresentation?: boolean;
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
    isPresentation,
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
            <span className={chevronClasses} 
                role={isPresentation ? 'presentation' : ''} aria-label={ariaLabel} />
        </span>
    )
}

export default Chevron;