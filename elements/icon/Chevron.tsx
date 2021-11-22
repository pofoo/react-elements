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
}

/**
 * Chevron Icon
 */
const Chevron = ( {
    id,
    className='',
    direction='right',
    background,
    isActive,
    ariaLabel,
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
                role='presentation' aria-label={ariaLabel} />
        </span>
    )
}

export default Chevron;