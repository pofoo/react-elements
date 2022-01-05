// types
import { Colors } from 'types';

/* TYPES */
interface Props {
    className?: string;
    ariaLabel: string;
    color?: 'brand-blue' | 'green' | 'blue' | 'yellow' | 'orange' | 'purple' | 'pink';
}

const Puff =( {
    className='',
    color='green',
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