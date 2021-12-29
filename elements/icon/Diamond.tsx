/* TYPES */
interface Props {
    // customization
    className?: string;
    // states
    isActive?: boolean;
    // accessibility
    ariaLabel: string;
}

/**
 * Diamond Icon
 */
const Diamond = ( { 
    className='',
    isActive,
    ariaLabel,
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
        <span className={diamondWrapperClasses}>
            <span className={diamondClasses} 
                role='presentation' aria-label={ariaLabel} />
        </span>
    )
}

export default Diamond;