import { Line } from '../icon';

/* TYPES */
interface Props {
    ariaLabel: string;
}

const Fail = ( {
    ariaLabel,
}: Props ) => {

    return (
        <span className='fail-wrapper' aria-label={ariaLabel} role='presentation'>
            <Line ariaLabel='' />
        </span>
    )
}

export default Fail;