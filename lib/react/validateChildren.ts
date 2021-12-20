// types
import { Children, ReactNode } from 'react';

export interface Options {
    elementName?: string;
}

/**
 * Validates that children is valid.
 * Children are valid if they are non-null and at least one child is present.
 * If an elementName is provided, all children must also be named according to the provided elementName.
 */
const validateChildren = (
    children: ReactNode,
    options: Options={},
): boolean => {
    // return value
    let isChildrenValid = true;
    
    // checking children are non-null and at least on child is present
    if ( !Children.count( children ) )
        isChildrenValid = false;
    
    // TO-DO - implement elementName check
    // typescript not allowing me to index child.type for some reason
    const { elementName=null } = options;
    if ( elementName ) {
        Children.toArray( children ).forEach( ( child ) => {
        } );
    }

    return isChildrenValid;
}

export default validateChildren;