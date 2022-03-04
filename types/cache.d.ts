import type { PromiseExtended } from 'dexie';

// based off dexie Table functions
type GetCache<T extends object = any> = () => PromiseExtended<( T ) | undefined>;
type UpdateCache<T extends object = any> = ( data: T ) => 
    ( Promise<boolean | undefined | void> ) | ( boolean | undefined | void );

export type {
    GetCache,
    UpdateCache,
}
