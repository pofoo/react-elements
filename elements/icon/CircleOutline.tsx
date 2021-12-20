
/* TYPES */
interface Props {
    className?: string;
    ariaLabel: string;
}

const CircleOutline = ( {
    className='',
    ariaLabel,
}: Props ) => {

    const circleOutlineClasses = `
        circle-outline-wrapper
        ${className}
    `;

    return (
        <span className={circleOutlineClasses} 
            role='presentation' aria-label={ariaLabel} />
    )
}

export default CircleOutline;