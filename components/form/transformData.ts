// constants
import { CONFIRM_PASSWORD } from '../../lib';
// types
import { FormData } from 'types';

/* TYPES */
export interface Options {
    sanitizePassword?: boolean;
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
    const { sanitizePassword=true } = options;

    const input: { [ key: string ]: string | Promise<string> } = {};

    ( Object.entries( data ) ).forEach( ( [ name, rawInput ] ) => {
        if ( sanitizePassword && name === CONFIRM_PASSWORD )
            return;
        
        input[ name ] = rawInput.value;
    } );

    return input;
}

export default transformData;