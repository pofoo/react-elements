/* TYPES */
interface ArrowProps {
    // customization
    className?: string;
    direction?: 'left' | 'right' | 'up' | 'down';
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
    `;

    return (
        <span className={arrowWrapperClasses}>
            <span className={arrowClasses} aria-label={ariaLabel} />
        </span>
    )
}

export default Arrow;