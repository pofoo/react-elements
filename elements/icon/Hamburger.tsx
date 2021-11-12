// partials
import Line from './Line';

/* TYPES */
interface HamburgerProps {
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
 * Hamburger Icon
 */
const Hamburger = ( { 
    id,
    className,
    isActive,
    ariaLabel,
    isPresentation=false,
}: HamburgerProps ) => {

    const hamburgerClasses = `
        hamburger
        ${className}
        ${isActive && 'active'}
    `;

    return (
        <span id={id} className={hamburgerClasses}
            role={isPresentation ? 'presentation' : ''} aria-label={ariaLabel}>
            <Line id='hamburger-line' ariaLabel='hamburger-line'/>
            <Line id='hamburger-line' ariaLabel='hamburger-line'/>
            <Line id='hamburger-line' ariaLabel='hamburger-line'/>
        </span>
    )
}

export default Hamburger;