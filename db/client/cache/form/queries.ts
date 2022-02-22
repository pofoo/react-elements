// dependencies
import { pick } from 'lodash';
// dexie
import { cacheDb } from '../dexie';


export const getDexieFormCache = () => {
    const cache = cacheDb.dexieForm.toArray();

    return cache.then( ( rawData ) => {
        const data = rawData[ 0 ];
        
        return data && pick( data, [ 'email', 'username' ] );
    } );
}