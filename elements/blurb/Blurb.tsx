// dependencies
import { FC } from 'react';
// elements
import { Triangle } from '../../elements';
// types
import { Colors } from 'types';

 /* TYPES */
interface Props {
    className?: string;
    color?: 'brand-blue' | 'green' | 'blue' | 'yellow' | 'orange' | 'purple' | 'pink';
}

/**
 * Blurb.
 * Useful for showing more information on hover. 
 */
const Blurb: FC<Props> = ( {
    children,
    className='',
    color='green',
} ) => {

    /* CLASSNAMES */
    const blurbClasses = `
        blurb
        ${color}
        ${className}
    `;  

    return (
        <div className={blurbClasses}>
            {children}
        </div>
    )
}

export default Blurb;