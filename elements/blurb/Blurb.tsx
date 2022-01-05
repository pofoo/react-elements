// dependencies
import { forwardRef, ReactNode } from 'react';
// elements
import { Triangle } from '../../elements';
// types
import { Colors } from 'types';


 /* TYPES */
interface Props {
    children?: ReactNode;
    className?: string;
    color?: 'brand-blue' | 'green' | 'blue' | 'yellow' | 'orange' | 'purple' | 'pink';
    style?: { [ key: string ]: string } | {};
}

/**
 * Blurb.
 * Useful for showing more information on hover. 
 */
const Blurb = forwardRef<HTMLDivElement, Props>( ( {
    children,
    className='',
    color='green',
    style,
}, ref ) => {

    /* CLASSNAMES */
    const blurbClasses = `
        blurb
        ${color}
        ${className}
    `;

    return (
        <div ref={ref} className={blurbClasses} style={style}>
            {children}
        </div>
    )
});

export default Blurb;