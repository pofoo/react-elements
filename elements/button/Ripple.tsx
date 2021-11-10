// dependencies
import { useState } from 'react';
import { nanoid } from 'nanoid';
// types
import { MouseEvent } from 'react';

/* TYPES */
interface RippleProps {
    className?: string;
}

const Ripple = ( {
    className,
 }: RippleProps ) => {
   
    /* TYPES */
    interface RippleStyles {
        top: string;
        left: string;
    };

    /* HOOKS */
    const [ rippleStyles, setRippleStyles ] = useState<RippleStyles[]>( [] );

    /* CLASSNAMES */
    const rippleClasses = `
        ripple-wrapper
        ${className}
    `;

    /* FUNCTIONS */
    const handleRippleClick = ( event: MouseEvent<HTMLDivElement> ) => {
        const target = event.target as HTMLDivElement;
        const rect = target.getBoundingClientRect();
        // width + height of the button
        const width = target.offsetWidth;
        const height = target.offsetHeight;
        // coordinates of the client click
        const xClick = event.clientX - rect.left;
        const yClick = event.clientY - rect.top;

        const newRippleStyles = {
            top: xClick + 'px',
            left: yClick + 'px',
            width: width + 'px',
            height: height + 'px',
        };

        // push new click onto the rippleStyles state
        setRippleStyles( ( rippleStyles ) => {
            return [ newRippleStyles, ...rippleStyles ];
        } );
        // remove the click from the array of clicks after 1 second
        // setTimeout( () => {
        //     setRippleStyles( ( rippleStyles ) => {
        //         return rippleStyles.splice( rippleStyles.indexOf( newrippleStyles, 1 ) )
        //     } );
        // }, 1000 );
    }

    return (
        <div className={rippleClasses} 
            role='presentation' tabIndex={-1}
            onClick={handleRippleClick}
            onPointerUp={() => {}}>
            {
                rippleStyles.length !== 0 && (
                    rippleStyles.map( ( style ) => {
                        console.log( style );
                        return (
                            <span key={nanoid(5)} className='ripple' 
                                style={style} />
                        )
                    } )
                )
            }
        </div>
    )
}

export default Ripple;