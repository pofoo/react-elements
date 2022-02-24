// dependencies
import { Dexie, Table } from 'dexie';
// events
import { populate } from './events';
// constants
import { DEXIE_FORM_CACHE } from '../../constants';
// types
import type { DexieFormCacheWithId } from './form/types';


export class CacheDb extends Dexie {
    [ DEXIE_FORM_CACHE ]!: Table<DexieFormCacheWithId>;

    constructor() {
        super( 'cacheDb' );

        this.version( 1 ).stores( {
            [ DEXIE_FORM_CACHE ]: '_id++, email, username',
        } );
    }
}

export const cacheDb = new CacheDb();

// cacheDb.on( 'populate', populate );