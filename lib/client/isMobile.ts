// dependencies
import { useState, useEffect } from 'react';
// installed hooks
import { useDebouncedCallback } from 'use-debounce';
// constants
import { BREAKPOINT_SMALL } from '../constants';

/**
 * Returns whether the user is coming in from a mobile device (using breakpoints).
 * Handles window resize as well.
 */
const isMobile = ( mobileWidth: number=BREAKPOINT_SMALL ) => {
    const [ width, setWidth ] = useState<number>( window.innerWidth );

    const handleWindowSizeChange = useDebouncedCallback( () => {
        const windowWidth = window.innerWidth;

        if ( windowWidth <= mobileWidth )
            setWidth( windowWidth )
    }, 100 );

    useEffect( () => {
        window.addEventListener( 'resize', handleWindowSizeChange );
        return () => {
            window.removeEventListener( 'resize', handleWindowSizeChange );
        }
    }, [] );

    return width <= mobileWidth;
}

export default isMobile;
