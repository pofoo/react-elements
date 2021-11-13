/* TYPES */
interface LineProps {
    // customization
    id?: string;
    className?: string;
    isRounded?: boolean;
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
    isRounded,
    ariaLabel,
    isPresentation=true,
}: LineProps ) => {

    const lineClasses = `
        line
        ${className}
        ${isRounded ? 'rounded' : ''}
    `;

    return (
        <span id={id} className={lineClasses} 
            role={isPresentation ? 'presentation' : ''} aria-label={ariaLabel} />
    )
}

export default Line;