// dependencies
import { Dexie, Table } from 'dexie';
// constants
import { DEXIE_FORM_CACHE } from '../../constants';
// types
import type { DexieFormCache } from './form/types';


export class CacheDb extends Dexie {
    [ DEXIE_FORM_CACHE ]!: Table<DexieFormCache>;

    constructor() {
        super( 'cacheDb' );

        this.version( 1 ).stores( {
            [ DEXIE_FORM_CACHE ]: 'email, username',
        } );
    }
}

export const cacheDb = new CacheDb();