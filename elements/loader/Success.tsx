
/* TYPES */
interface Props {
    ariaLabel: string;
}

const Success = ( {
    ariaLabel,
}: Props ) => {

    return (
        <span className='success-wrapper' aria-label={ariaLabel} role='presentation'>
            <span className='check-line line-tip' role='presentation' />
            <span className='check-line line-long' role='presentation' />
        </span>
    )
}

export default Success;