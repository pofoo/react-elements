// dexie
import { cacheDb } from '../dexie';

export const getDexieFormCache = () => {
    return cacheDb.dexieForm.toCollection();
}