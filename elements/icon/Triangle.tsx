/* TYPES */
interface TriangleProps {
    className?: string;
    direction?: 'left' | 'right' | 'up' | 'down';
    ariaLabel: string;
}

/**
 * Triangle Icon
 */
const Triangle = ( { 
    className,
    direction='right',
    ariaLabel,
}: TriangleProps ) => {

    const triangleWrapperClasses = `
        ${className}
        triangle-wrapper
    `;

    const triangleClasses = `
        triangle
        ${direction}
    `;

    return (
        <span className={triangleWrapperClasses}>
            <span className={triangleClasses} aria-label={ariaLabel} />
        </span>
    )
}

export default Triangle;