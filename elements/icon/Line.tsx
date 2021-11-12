/* TYPES */
interface LineProps {
    // customization
    id?: string;
    className?: string;
    // accessibility
    ariaLabel: string;
    isPresentation?: boolean;
}

/**
 * Line Icon
 */
const Line = ( {
    id,
    className,
    ariaLabel,
    isPresentation=true,
}: LineProps ) => {

    const lineClasses = `
        line
        ${className}
    `;

    return (
        <span id={id} className={lineClasses} 
            role={isPresentation ? 'presentation' : ''} aria-label={ariaLabel} />
    )
}

export default Line;