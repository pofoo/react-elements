/* TYPES */
interface LineProps {
    // customization
    className?: string;
    // accessibility
    ariaLabel: string;
}

/**
 * Line Icon
 */
const Line = ( { 
    className,
    ariaLabel,
}: LineProps ) => {

    const lineClasses = `
        line
        ${className}
    `;

    return (
        <span className={lineClasses} aria-label={ariaLabel} />
    )
}

export default Line;