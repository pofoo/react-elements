/* TYPES */
interface Props {
    // customization
    className?: string;
    direction?: 'left' | 'right' | 'up' | 'down';
    // states
    isActive?: boolean;
    // accessibility
    ariaLabel: string;
}

/**
 * Triangle Icon
 */
const Triangle = ( { 
    className='align-left',
    direction='right',
    isActive,
    ariaLabel,
}: Props ) => {

    const triangleWrapperClasses = `
        ${className}
        triangle-wrapper
    `;

    const triangleClasses = `
        triangle
        ${direction}
        ${isActive ? 'active': 'not-active'}
    `;

    return (
        <span className={triangleWrapperClasses}>
            <span className={triangleClasses} 
                role='presentation 'aria-label={ariaLabel} />
        </span>
    )
}

export default Triangle;