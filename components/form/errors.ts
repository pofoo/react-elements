// types
import type { ReactNode } from 'react';

/**
 * A child was specified that is not a perbuilt input component.
 */
const _uniqueChild = (
    child: ReactNode,
) => {
    console.warn( `An custom input child was specified: ${child}`)
}

export {
    _uniqueChild,
}