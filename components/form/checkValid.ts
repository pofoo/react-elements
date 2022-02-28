// types
import type { Match } from 'elements/form/types';


/* TYPES */
interface Options {
    match?: Match;
    noEmptyVal?: boolean;
}

export type CheckValid = ( value: string, pattern?: RegExp, options?: Options ) => boolean;

/**
 * Checks if an input field is valid based off a given regex pattern.
 * Assumes the input is required.
 */
const checkValid = (
    value: string,
    pattern?: RegExp,
    options: Options={},
) => {
    /* OPTIONS */
    const { match, noEmptyVal } = options;
    const isValueEmpty = noEmptyVal ? value.trim() === '' : value === '';

    if ( match ) {
        const isMatchValid = value === match.value && !isValueEmpty;

        if ( pattern )
            return pattern.test( value ) && isMatchValid;

        return isMatchValid;
    }

    if ( pattern )
        return pattern.test( value ) && !isValueEmpty;
    
     return !isValueEmpty;
}

export default checkValid;