
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
            <span className='puff puff-1' role='presentation'/>
            <span className='puff puff-2' role='presentation'/>
        </span>
    )
}

export default Puff;