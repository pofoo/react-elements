// partials
import Line from './Line';

/* TYPES */
interface Props {
    // customization
    id?: string;
    className?: string;
    // TO-DO - implement xBorder
    xBorder?: 'circle' | 'square';
    isRounded?: boolean;
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
    xBorder,
    isRounded=true,
    isActive,
    ariaLabel,
    isPresentation=false,
}: Props ) => {

    const activeClass = isActive ? 'active': '';

    const hamburgerClasses = `
        hamburger
        ${className}
        ${xBorder && `${xBorder} border`}
        ${activeClass}
    `;

    const lineClasses = `
        ${activeClass}
        ${isRounded ? 'rounded' : ''}
    `;

    return (
        <span id={id} className={hamburgerClasses}
            role={isPresentation ? 'presentation' : ''} aria-label={ariaLabel}>
            <Line id='hamburger-line' className={lineClasses} ariaLabel='hamburger-line'/>
            <Line id='hamburger-line' className={lineClasses} ariaLabel='hamburger-line'/>
            <Line id='hamburger-line' className={lineClasses} ariaLabel='hamburger-line'/>
        </span>
    )
}

export default Hamburger;