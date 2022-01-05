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
    style?: { [ key: string ]: string };
}

/**
 * Blurb.
 * Useful for showing more information on hover. 
 */
const Blurb: FC<Props> = ( {
    children,
    className='',
    color='green',
    style,
} ) => {

    /* CLASSNAMES */
    const blurbClasses = `
        blurb
        ${color}
        ${className}
    `;  

    return (
        <div className={blurbClasses} style={style}>
            {children}
        </div>
    )
}

export default Blurb;