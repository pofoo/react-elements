
/* TYPES */
interface Props {
    // styling
    color: string
    // accessibility
    ariaLabel: string;
}

const Puff =( {
    color,
    ariaLabel
}: Props ) => {

    const puffClasses = `
        puff-wrapper
        ${color}
    `;

    return (
        <span className={puffClasses} role='presentation' aria-label={ariaLabel}>
            <span className='puff puff-1' role='presentation' aria-label={`${ariaLabel} puff animation 1`}/>
            <span className='puff puff-2' role='presentation' aria-label={`${ariaLabel} puff animation 2`}/>
        </span>
    )
}

export default Puff;