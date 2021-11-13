/* TYPES */
interface Props {
    // customization
    id?: string;
    className?: string;
    // states
    isActive?: boolean;
    // accessibility
    ariaLabel: string;
    isPresentation?: boolean;
}

/**
 * Diamond Icon
 */
const Diamond = ( { 
    id,
    className,
    isActive,
    ariaLabel,
    isPresentation=false,
}: Props ) => {

    const diamondWrapperClasses = `
        ${className}
        diamond-wrapper
    `;

    const diamondClasses = `
        diamond
        ${isActive ? 'active': 'not-active'}
    `;

    return (
        <span id={id} className={diamondWrapperClasses}>
            <span className={diamondClasses} 
                role={isPresentation ? 'presentation' : ''} aria-label={ariaLabel} />
        </span>
    )
}

export default Diamond;