// dexie
import { cacheDb } from './dexie';
import { DexieFormCacheWithId } from './mutations';

export const populate = async () => {
    await cacheDb.dexieForm.add( {
        _id: 0,
        username: {
            value: '',
            isValid: false,
        },
        email: {
            value: '',
            isValid: false,
        },
    } as DexieFormCacheWithId );
}