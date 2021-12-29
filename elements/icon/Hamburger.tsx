// partials
import Line from './Line';

/* TYPES */
interface Props {
    // customization
    className?: string;
    // TO-DO - implement xBorder
    xBorder?: 'circle' | 'square';
    isRounded?: boolean;
    // states
    isActive?: boolean;
    // accessibility
    ariaLabel: string;
}

/**
 * Hamburger Icon
 */
const Hamburger = ( { 
    className='',
    xBorder,
    isRounded=true,
    isActive,
    ariaLabel,
}: Props ) => {

    /* CONTENT */
    const activeClass = isActive ? 'active': '';

    /* CLASSNAMES */
    const hamburgerClasses = `
        hamburger
        ${className}
        ${xBorder && `${xBorder} border`}
        ${activeClass}
    `;

    const lineClasses = `
        hamburger-line
        ${activeClass}
        ${isRounded ? 'rounded' : ''}
    `;

    return (
        <span className={hamburgerClasses}
            role='presentation' aria-label={ariaLabel}>
            <Line className={lineClasses} ariaLabel='hamburger-line'/>
            <Line className={lineClasses} ariaLabel='hamburger-line'/>
            <Line className={lineClasses} ariaLabel='hamburger-line'/>
        </span>
    )
}

export default Hamburger;