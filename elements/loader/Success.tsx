
/* TYPES */
interface Props {
    ariaLabel: string;
}

const Success = ( {
    ariaLabel,
}: Props ) => {

    return (
        <div className='success-wrapper' aria-label={ariaLabel} role='presentation'>
            <span className='check-icon'>
                <span className='icon-line line-tip' role='presentation' />
                <span className='icon-line line-tip' role='presentation' />
                <span className='icon-circle' role='presenation' />
                <span className='icon-fix' role='presentation' />
            </span>
        </div>
    )
}

export default Success;