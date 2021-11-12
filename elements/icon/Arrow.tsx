/* TYPES */
interface ArrowProps {
    // customization
    className?: string;
    direction?: 'left' | 'right' | 'up' | 'down';
    type?: 'pointed' | 'triangle';
    // states
    isActive?: boolean;
    // accessibility
    ariaLabel: string;
}

/**
 * Arrow Icon
 */
const Arrow = ( { 
    className,
    direction='right',
    type='pointed',
    isActive,
    ariaLabel,
}: ArrowProps ) => {

    const arrowWrapperClasses = `
        ${className}
        arrow-wrapper
    `;

    const arrowClasses = `
        arrow
        ${direction}
        ${isActive && 'active'}
        ${type}
    `;

    return (
        <span className={arrowWrapperClasses}>
            <span className={arrowClasses} aria-label={ariaLabel} />
        </span>
    )
}

export default Arrow;