/* TYPES */
interface Props {
    // customization
    id?: string;
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
    id,
    className,
    direction='right',
    type='pointed',
    isActive,
    ariaLabel,
}: Props ) => {

    const arrowWrapperClasses = `
        ${className}
        arrow-wrapper
    `;

    const arrowClasses = `
        arrow
        ${direction}
        ${isActive ? 'active': 'not-active'}
        ${type}
    `;

    return (
        <span id={id} className={arrowWrapperClasses}>
            <span className={arrowClasses} 
                role='presentation' aria-label={ariaLabel} />
        </span>
    )
}

export default Arrow;