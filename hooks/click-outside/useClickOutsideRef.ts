// dependencies
import { useEffect, useRef, RefObject } from 'react';

/* TYPES */
type Options = {
    enableEscape?: boolean;
}

/**
 * Returns refs that calls an onClick function everytime a click is made outside of that HTML Element
 * Defaults to 1 ref returned - all refs are returned in an array
 * numRefs only takes positive numbers
 */
const useClickOutsideRef = <T extends HTMLElement>( 
    onClick: () => void,
    options: Options={},
    numRefs: number=1, // this should only be a positive number
    // TO-DO - the generic T right now assumes that all the refs are going to be the same kind of HTMLElement
): RefObject<T>[] => {

    // creating an array of refs
    if ( numRefs >= 1 ) {
        const refList: RefObject<T>[] = [];

        for ( let i=0; i < numRefs; i++ ) {
            refList.push( useRef<T>( null ) );
        }

        const clickOutsideFn = ( event: PointerEvent ): void => {
            // if the HTMLElement ref is clicked, isClicked will be false
            // by default, we assume the HTMLElement ref is clicked (false)
            let isClicked: boolean = false;

            for ( const ref of refList ) {
                // when you navigate to a new page, for some reason a nullish ref gets added to the beginning of the refs
                if ( !ref.current ) continue;
                if ( !ref.current ) isClicked = true;
                if ( ref.current.contains( event.target as T ) ) isClicked = true;
            }
            // the HTMLElement was not clicked - call the onClick function
            if ( !isClicked ) onClick();
        }

        // attaching the clickOutsideFn to all the refs in the refList
        useEffect( () => {
            document.addEventListener( 'pointerdown', clickOutsideFn );
            return () => {
                document.removeEventListener( 'pointerdown', clickOutsideFn );
            }
        }, [] );

        // options
        const { enableEscape=true } = options;
        // call onClick when user presses the escape key
        if ( enableEscape ) {
            const handleEscape = ( event: KeyboardEvent ) => {
                if ( event.key === 'Escape' ) {
                    onClick();
                }
            }
            // attaching the clickOutsideFn to the escape key
            useEffect( () => {
                document.addEventListener( 'keydown', handleEscape );
                return () => {
                    document.removeEventListener( 'keydown', handleEscape );
                }
            }, [] );
        }

        return refList;
    } 
    // numRefs specfifed as something other than a positive integer
    else {
        throw(`numRefs needs to be a positive number. You specified numRefs as ${numRefs}.`)
    }
}

export default useClickOutsideRef;