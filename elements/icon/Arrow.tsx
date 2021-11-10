/* TYPES */
interface ArrowProps {
    className?: string;
    direction?: 'left' | 'right' | 'up' | 'down';
    ariaLabel: string;
}

/**
 * Arrow Icon
 */
const Arrow = ( { 
    className,
    direction='right',
    ariaLabel,
}: ArrowProps ) => {

    const arrowWrapperClasses = `
        ${className}
        arrow-wrapper
    `;

    const arrowClasses = `
        arrow
        ${direction}
    `;

    return (
        <span className={arrowWrapperClasses}>
            <span className={arrowClasses} aria-label={ariaLabel} />
        </span>
    )
}

export default Arrow;