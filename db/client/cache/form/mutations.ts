// dexie
import { cacheDb } from '../dexie';


/* TYPES */
export interface DexieFormCache {
    email: string;
    username: string;
}

export const putDexieFormCache = (
    data: DexieFormCache,
) => {
    return cacheDb.dexieForm.put( data );
}

export const clearDexieFormCache = () => {
    return cacheDb.dexieForm.clear();
}