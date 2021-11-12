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
    isPresentation?: boolean;
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
    isPresentation=false,
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
            <span className={arrowClasses} 
                role={isPresentation ? 'presentation' : ''} aria-label={ariaLabel} />
        </span>
    )
}

export default Arrow;