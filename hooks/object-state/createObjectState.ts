// dependencies
import { useState, SetStateAction } from 'react';

/* CONSTANTS */
const POPUP_NAME = 'param';

/* TYPES */
export interface Options <T extends any>{
    initialState?: T; // initial state for each object value
    uniqueValues?: { [ key: number ]: T } ; // object of unique values to set to a custom initial value
    variableName?: string; // variable name of each object key
};

/**
 * Returns an object state with a specified length key value pairs.
 * Useful for keeping track of multiple like-kind elements states ( i.e -> multiple dropdown menus ).
 */
const createObjectState = <T extends any>( 
    length: number,
    options: Options<T>={},
) => {

    /* TYPES */
    // TO-DO - find a better way to use generics
    type ObjectState = { [ key: string ] : T | any }
    
    /* CONTENT */
    const { 
        initialState=false,  // default to boolean type of false
        uniqueValues={}, // default to no custom values
        variableName=POPUP_NAME,
    } = options;

    const useObjectState = () => {
        const objectState: ObjectState={};
        
        for ( let i =0; i < length; i++ ) {
            const key = `${variableName}-${i}`;

            if ( i in uniqueValues )
                objectState[ key ] = uniqueValues[ i ];
            else
                objectState[ key ] = initialState;
        }

        return useState( objectState );
    }

    /* HELPER FUNCTIONS */
    /**
     * By default, resets all key:value pairs to the initial state
     * If a unique values object is specified, the key:value pair is updated according to the specified number
     */
    useObjectState.toggle = (
        setObjectState: SetStateAction<T | any>,
        uniqueValues: { [ key: number ]: T }={},
    ) => {
        setObjectState( ( currObject: ObjectState ) => {
            const newObject: ObjectState={};

            Object.keys( currObject ).forEach( ( currKey, index ) => {
                if ( index in uniqueValues )
                    newObject[ currKey ] = uniqueValues[ index ];
                else
                    newObject[ currKey ] = initialState;
            } );

            return newObject;
        } );
    }

    return useObjectState;
}

export default createObjectState;