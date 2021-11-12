/* TYPES */
interface TriangleProps {
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
}: TriangleProps ) => {

    const triangleWrapperClasses = `
        ${className}
        triangle-wrapper
    `;

    const triangleClasses = `
        triangle
        ${direction}
        ${isActive && 'active'}
    `;

    return (
        <span className={triangleWrapperClasses}>
            <span className={triangleClasses} aria-label={ariaLabel} />
        </span>
    )
}

export default Triangle;