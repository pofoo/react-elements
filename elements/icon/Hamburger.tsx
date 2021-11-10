/* TYPES */
interface HamburgerProps {
    // customization
    className?: string;
    // states
    isActive?: boolean;
    // accessibility
    ariaLabel: string;
}

/**
 * Hamburger Icon
 */
const Hamburger = ( { 
    className,
    isActive,
    ariaLabel,
}: HamburgerProps ) => {

    const hamburgerWrapperClasses = `
        ${className}
        hamburger-wrapper
    `;

    return (
        <span className={hamburgerWrapperClasses}>
            <span className='hamburger' aria-label={ariaLabel} />
        </span>
    )
}

export default Hamburger;