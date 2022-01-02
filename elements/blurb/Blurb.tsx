// dependencies
import { FC } from 'react';

 /* TYPES */
interface Props {
    className?: string;
}

/**
 * Blurb popup.
 * Useful for showing more information on hover. 
 */
const Blurb: FC<Props> = ( {
    children,
    className='',
} ) => {

    const blurbClasses = `
        blurb
        ${className}
    `;

    return (
        <div className={blurbClasses}>
            {children}
        </div>
    )
}

export default Blurb;