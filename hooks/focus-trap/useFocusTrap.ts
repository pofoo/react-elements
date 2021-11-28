// dependencies
import { useState, useEffect, RefObject, useRef } from 'react';

/* TYPES */
export type InitialFocus = 'first' | 'custom';

/**
 * Adds focus trap effect to a given ref.
 */
const useFocusTrap = <T extends HTMLElement>(
    ref: RefObject<T>,
    isActive: boolean, // isActive state of pop up dialog
    initialFocus: InitialFocus='first', // HTML Element we should draw focus to first
    tabbableElems: string='', // additional tabbable elements to be added
) => {

    /* HOOKS */
    const [ lastFocusedElem, setLastFocusedElem ] = useState<HTMLElement | null>( null );
    const initialMount = useRef<boolean>( false );

    /* CONSTANTS */
    const TABBABLE_ELEMS = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), area[href], [tabindex="0"]';
    // const maybe = 'audio[controls], video[controls]';

    useEffect( () => {
        const target = ref.current as T;
        const focusedElem = document.activeElement as HTMLElement;

        setLastFocusedElem( document.activeElement as HTMLElement );
        // focusedElem.blur();

        const fn = ( event: KeyboardEvent ) => {
            handleTab<T>( event, target, initialFocus, TABBABLE_ELEMS + tabbableElems );
        }

        target.addEventListener( 'keydown', fn );
        return () => {
            // on unmount, focus the last focused elem outside of the target
            // lastFocusedElem!.focus();
            target.removeEventListener( 'keydown', fn );
        }
        // TO-DO: there is probs a better way to do this
    }, [ isActive ] );
}

const handleTab = <T extends HTMLElement>(
    event: KeyboardEvent,
    target: T,
    initialFocus: InitialFocus, 
    tabbableElems: string,
) => {
    if ( event.key === 'Tab' ) {
        // currently focused element within the document
        const focusedElement = document.activeElement as HTMLElement;
        // all focusable elements for the given target
        const focusableElems = target.querySelectorAll( tabbableElems );

        // no focusable elements on the dialog box
        const numFocusableElems = focusableElems.length;
        if ( numFocusableElems === 0 ) throw( 'At least one tabbable element needs to be present within your dialog box. If you feel this is a mistake, try adding your tabbable element within the optional tabbableElems parameter.')

        // elements on the target
        const firstElement = focusableElems[ 0 ] as HTMLElement;
        const lastElement = focusableElems[ numFocusableElems - 1 ] as HTMLElement;

        // focus the first focusable element on the target
        if ( initialFocus === 'first' ) {
            firstElement.focus();
        }
        // TO-DO: user specifies custom element
        else if ( initialFocus === 'custom' ) {

        }

        // if going forward by pressing tab and lastElement is active shift focus to first focusable element 
        if ( !event.shiftKey && focusedElement === lastElement ) {
            firstElement.focus();
            return event.preventDefault();
        }

        // if going backward by pressing tab and firstElement is active shift focus to last focusable element 
        if ( event.shiftKey && focusedElement === firstElement ) {
            lastElement.focus();
            return event.preventDefault();
        }
    }
}

export default useFocusTrap;