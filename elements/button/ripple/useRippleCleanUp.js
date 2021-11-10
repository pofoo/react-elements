// dependencies
import { useLayoutEffect } from 'react';

const useRippleCleanUp = (
    rippleCount,
    duration,
    cleanUpFunction,
) => {
    
    useLayoutEffect( () => {
        let bounce = null;
        if ( rippleCount > 0 ) {
            clearTimeout( bounce );

            bounce = setTimeout( () => {
                cleanUpFunction();
                clearTimeout( bounce );
            }, duration * 2 );
        }

        return () => clearTimeout( bounce );
    }, [ rippleCount, duration, cleanUpFunction ] );
}

export default useRippleCleanUp;