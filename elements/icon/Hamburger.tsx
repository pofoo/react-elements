/* TYPES */
interface HamburgerProps {
    className?: string;
    ariaLabel: string;
}

/**
 * Hamburger Icon
 */
const Hamburger = ( { 
    className,
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