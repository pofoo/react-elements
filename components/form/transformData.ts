// constants
import { CONFIRM_PASSWORD } from '../../lib';
// types
import { FormData, TransformedFormData } from 'types';


/* TYPES */
export interface Options {
    sanitizePassword?: boolean;
    trimValues?: boolean;
}

/**
 * Cleans up the raw form input data to only have name:value pairs.
 * This is data that will be stored in a database.
 */
 const transformData = ( 
     data: FormData,
     options: Options={},
) => {
    /* OPTIONS */
    const { sanitizePassword=true, trimValues } = options;

    const input: TransformedFormData = {};

    ( Object.entries( data ) ).forEach( ( [ name, rawInput ] ) => {
        if ( sanitizePassword && name === CONFIRM_PASSWORD )
            return;
        
        input[ name ] = trimValues ? rawInput.value.trim() : rawInput.value;
    } );

    return input;
}

export default transformData;