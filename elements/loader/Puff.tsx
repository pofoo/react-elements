
/* TYPES */
interface Props {
    // styling
    color: string
    // accessibility
    ariaLabel: string;
}

const Puff =( {
    ariaLabel
}: Props ) => {

    return (
        <span className='puff-wrapper' role='presentation' aria-label={ariaLabel}>
            <span className='puff-1' role='presentation' aria-label={`${ariaLabel} puff animation 1`}/>
            <span className='puff-2' role='presentation' aria-label={`${ariaLabel} puff animation 1`}/>
        </span>
    )
}

export default Puff;