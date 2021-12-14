/* TYPES */
interface Props {
    // customization
    id?: string;
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
    id,
    className='',
    direction='right',
    isActive,
    ariaLabel,
}: Props ) => {

    const chevronWrapperClasses = `
        chevron-wrapper
        ${className}
    `;

    const chevronClasses = `
        chevron
        ${direction}
        ${isActive ? 'active': 'not-active'}
    `;

    return (
        <div id={id} className={chevronWrapperClasses}>
            <span className={chevronClasses} 
                role='presentation' aria-label={ariaLabel} />
        </div>
    )
}

export default Chevron;