// types
import { FormData } from 'types';

/**
 * Cleans up the raw form input data to only have name:value pairs.
 * This is data that will be stored in a database.
 */
 const transformData = ( data: FormData ) => {
    const input: { [ key: string ]: string } = {};

    ( Object.entries( data ) ).forEach( ( [ name, rawInput ] ) => {
        input[ name ] = rawInput.value;
    } );

    return input;
}

export default transformData;