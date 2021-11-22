/* TYPES */
interface Props {
    // customization
    id?: string;
    className?: string;
    isRounded?: boolean;
    // accessibility
    ariaLabel: string;
}

/**
 * Line Icon
 */
const Line = ( {
    id,
    className='',
    isRounded,
    ariaLabel,
}: Props ) => {

    const lineClasses = `
        line
        ${className}
        ${isRounded ? 'rounded' : ''}
    `;

    return (
        <span id={id} className={lineClasses} 
            role='presentation' aria-label={ariaLabel} />
    )
}

export default Line;