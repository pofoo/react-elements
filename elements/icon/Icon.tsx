/* TYPES */
interface IconProps {
    className?: string;
    type?: 'chevron' | 'arrow' | 'hamburger';
    ariaLabel: string;
}

// TO-DO - a type or className needs to be specified
const Icon = ( { 
    className,
    type,
    ariaLabel,
}: IconProps ) => {

    const iconClasses = `
        icon
        ${className}
        ${type}
    `;

    return (
        <span className={iconClasses} aria-label={ariaLabel} />
    )
}

export default Icon;