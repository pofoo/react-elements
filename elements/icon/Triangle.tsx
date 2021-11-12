/* TYPES */
interface TriangleProps {
    // customization
    id?: string;
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
    id,
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
        <span id={id} className={triangleWrapperClasses}>
            <span className={triangleClasses} 
                role={isPresentation ? 'presentation' : ''} aria-label={ariaLabel} />
        </span>
    )
}

export default Triangle;