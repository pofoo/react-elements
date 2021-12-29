
/* TYPES */
interface Props {
    className?: string;
    color: string
    ariaLabel: string;
}

const Puff =( {
    className='',
    color,
    ariaLabel
}: Props ) => {

    const puffClasses = `
        puff-wrapper
        ${color}
        ${className}
    `;

    return (
        <span className={puffClasses} role='presentation' aria-label={ariaLabel}>
            <span className='puff puff-1' role='presentation'/>
            <span className='puff puff-2' role='presentation'/>
        </span>
    )
}

export default Puff;