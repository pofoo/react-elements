// dependencies
import { ReactNode, isValidElement } from 'react';

/* TYPES */
export type Element = 'primitive' | 'HTMLElement' | 'JSXElement';

export interface Options {
    // when provided, the HTML tag of the child is checked to match the elementName
    // if same, 'match' is returned
    // overrides match Element array
    // TO-DO - make this into an array of elementNames
    elementName?: string;
    // array of potential element children that are allowed to be rendered
    match?: Element[];
}

/**
 * Validates that a child is valid.
 * Ensures that a configuration object can be passed to a custom JSX Element when elementName is provided.
 */
const validateChild = (
    child: ReactNode,
    options: Options={},
): ( boolean | 'match' ) => {

    /* CONTENT */
    const { elementName, match=[ 'HTMLElement', 'JSXElement' ] } = options;

    /* PRIMITIVES */
    if ( typeof child === 'string' || typeof child === 'number' )
        return match.includes( 'primitive' ) ? true : false;

    if ( isValidElement( child ) ) {
        const type = child.type;

        /* HTML ELEMENT */
        if ( typeof type === 'string' ) 
            return match.includes( 'HTMLElement' ) ? true : false;
        
        /* JSX ELEMENT */
        if ( typeof type === 'function' ) {
            const displayName = type.name;
            
            if ( elementName && displayName === elementName )
                return 'match'
            
            return match.includes( 'JSXElement' ) ? true : false;
        }
    }

    // the child is either null or undefined value
    return false;
}

export default validateChild;