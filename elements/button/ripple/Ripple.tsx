// dependencies
import { useState } from 'react';
import { nanoid } from 'nanoid';
// types
import { MouseEvent } from 'react';
// hooks
import useRippleCleanUp from './useRippleCleanUp';

/* TYPES */
interface RippleProps {
    className?: string;
    duration?: number;
}

const Ripple = ( {
    className,
    duration=750,
 }: RippleProps ) => {
   
    /* TYPES */
    interface RippleStyles {
        top: string;
        left: string;
        width: string;
        height: string;
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

        const rippleContainer = target.getBoundingClientRect();
        const { width, height } = rippleContainer;
        // idk what this does
        const size = width > height ? width : height;
        // x and y clicks relative to the ripple div
        const xClick = event.pageX - rippleContainer.x - ( size / 2 );
        const yClick = event.pageY - rippleContainer.y - ( size / 2 );

        const newRippleStyles = {
            top: yClick + 'px',
            left: xClick + 'px',
            width: size + 'px',
            height: size + 'px',
            animationDuration: duration + 'ms',
        };

        // push new click onto the rippleStyles state
        setRippleStyles( ( rippleStyles ) => {
            return [ newRippleStyles, ...rippleStyles ];
        } );
    }

    useRippleCleanUp( rippleStyles.length, duration, () => setRippleStyles( [] ) );

    return (
        <div className={rippleClasses} 
            role='presentation' tabIndex={-1}
            onClick={handleRippleClick}
            onPointerUp={() => {}}>
            {
                rippleStyles.length > 0 && (
                    rippleStyles.map( ( style ) => {
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