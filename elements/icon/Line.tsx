/* TYPES */
interface Props {
    // customization
    className?: string;
    isRounded?: boolean;
    // accessibility
    ariaLabel: string;
}

/**
 * Line Icon
 */
const Line = ( {
    className='',
    isRounded=true,
    ariaLabel,
}: Props ) => {

    const lineClasses = `
        line
        ${className}
        ${isRounded ? 'rounded' : ''}
    `;

    return (
        <span className={lineClasses} 
            role='presentation' aria-label={ariaLabel} />
    )
}

export default Line;