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
 * Triangle Icon
 */
const Triangle = ( { 
    id,
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
        <span id={id} className={triangleWrapperClasses}>
            <span className={triangleClasses} 
                role='presentation 'aria-label={ariaLabel} />
        </span>
    )
}

export default Triangle;