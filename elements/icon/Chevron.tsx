/* TYPES */
interface Props {
    // customization
    id?: string;
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
    id,
    className,
    direction='right',
    background,
    isActive,
    ariaLabel,
    isPresentation=false,
}: Props ) => {

    const chevronWrapperClasses = `
        chevron-wrapper
        ${className}
        ${background}
    `;

    const chevronClasses = `
        chevron
        ${direction}
        ${isActive ? 'active': 'not-active'}
    `;

    return (
        <span id={id} className={chevronWrapperClasses}>
            <span className={chevronClasses} 
                role={isPresentation ? 'presentation' : ''} aria-label={ariaLabel} />
        </span>
    )
}

export default Chevron;