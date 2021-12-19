import { Line } from '../icon';

/* TYPES */
interface Props {
    className?: string;
    ariaLabel: string;
}

const Fail = ( {
    className='',
    ariaLabel,
}: Props ) => {

    const failClasses = `
        fail-wrapper
        ${className}
    `;

    return (
        <span className={failClasses} aria-label={ariaLabel} role='presentation'>
            <Line ariaLabel='' />
        </span>
    )
}

export default Fail;