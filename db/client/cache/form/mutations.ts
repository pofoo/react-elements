// dexie
import { cacheDb } from '../dexie';
import { omit } from 'lodash';
// constants
import { SENSETIVE_INPUTS } from './constants';
// types
import type { FormDataValues, FormData } from '../../../../types';


/* TYPES */
interface DexieForm {
    email: FormDataValues;
    username: FormDataValues;
}

export type DexieFormCache = FormData<DexieForm>;

export type DexieFormCacheWithId = DexieFormCache & {
    _id: number;
}

/* UTIL FUNCTIONS */
const omitSensetiveFields = ( data: DexieFormCache ) => {
    return omit( data, SENSETIVE_INPUTS );
}

export const putDexieFormCache = (
    data: DexieFormCache,
) => {
    return cacheDb.dexieForm.put( {
        _id: 0,
        ...omitSensetiveFields( data ),
    } as DexieFormCacheWithId );
}