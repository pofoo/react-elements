// dependencies
import { useEffect, useRef, MouseEvent, TouchEvent, RefObject } from 'react';

/* TYPES */
type TapEvent = MouseEvent | TouchEvent;

/**
 * Returns refs that calls an onClick function everytime a click is made outside of that HTML Element
 * Defaults to 1 ref returned - if greater than 1, the refs will be returned in an array
 * numRefs only takes positive numbers
 */
const useClickOutsideRef = <T extends HTMLElement>( 
    onClick: ( event: TapEvent ) => void,
    numRefs: number=1 // this should only be a positive number
): RefObject<T>[] | RefObject<T> => {

    // creating an array of refs
    if ( numRefs > 1 ) {
        const refList: RefObject<T>[] = [];

        for ( let i=0; i < numRefs; i++ ) {
            refList.push( useRef( null ) );
        }

        const clickOutsideFn = ( event: TapEvent ): void => {
            let isFocused: boolean = false;
            for ( const ref of refList ) {
                // when you navigate to a new page, for some reason a nullish ref gets added to the beginning of the refs
                if ( !ref.current ) continue;
                if ( !ref.current ) isFocused = true;
                if ( ref.current.contains( event.target as HTMLElement ) ) isFocused = true;
            }
            if ( !isFocused ) onClick( event );
        }   
        // attaching the clickOutsideFn to all the refs in the refList
        addRefEventListener( clickOutsideFn );

        return refList;
    } 
    // creating a single ref
    else if ( numRefs === 1 ) {
        const ref: RefObject<T> = useRef( null );
        
        const clickOutsideFn = ( event: TapEvent ): void => {
            if ( !ref.current ) return;
            if ( ref.current.contains( event.target as HTMLElement ) ) return;
            onClick( event );

        }
        // attaching the clickOutsideFn to the ref
        addRefEventListener( clickOutsideFn );

        return ref;
    }
    // numRefs specfifed as something other than a positive integer
    else {
        throw(`numRefs needs to be a positive number. You specified numRefs as ${numRefs}.`)
    }
}


const addRefEventListener = ( clickOutsideFn: ( event: TapEvent ) => void ) => {
    useEffect( () => {
        document.addEventListener( 'mousedown', clickOutsideFn );
        document.addEventListener( 'touchstart', clickOutsideFn );
        return () => {
            document.removeEventListener( 'mousedown', clickOutsideFn );
            document.removeEventListener( 'touchstart', clickOutsideFn );
        }
    }, [] );  
}

export default useClickOutsideRef;