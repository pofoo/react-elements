/* TYPES */
interface LineProps {
    // customization
    className?: string;
    // accessibility
    ariaLabel: string;
    isPresentation?: boolean;
}

/**
 * Line Icon
 */
const Line = ( { 
    className,
    ariaLabel,
    isPresentation,
}: LineProps ) => {

    const lineClasses = `
        line
        ${className}
    `;

    return (
        <span className={lineClasses} 
            role={isPresentation ? 'presentation' : ''} aria-label={ariaLabel} />
    )
}

export default Line;