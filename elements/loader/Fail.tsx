// elements / icons
import { Line, CircleOutline } from '../icon';

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
            <Line className='x-line' ariaLabel='fail line' />
            <Line className='x-line' ariaLabel='fail line' />
            <CircleOutline className='circle' ariaLabel='fail circle'/>
        </span>
    )
}

export default Fail;