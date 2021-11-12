/* TYPES */
interface TriangleProps {
    // customization
    className?: string;
    direction?: 'left' | 'right' | 'up' | 'down';
    // states
    isActive?: boolean;
    // accessibility
    ariaLabel: string;
    isPresentation?: boolean;
}

/**
 * Triangle Icon
 */
const Triangle = ( { 
    className='align-left',
    direction='right',
    isActive,
    ariaLabel,
    isPresentation=false,
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
            <span className={triangleClasses} 
                role={isPresentation ? 'presentation' : ''} aria-label={ariaLabel} />
        </span>
    )
}

export default Triangle;