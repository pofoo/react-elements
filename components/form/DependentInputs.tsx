// dependencies
import { FC, Children } from 'react'
// lib
import { validateChild } from '../../lib';
// constants
import { CHILD_NAMES_LIST } from './constants'

/* TYPES */
export interface Props {

}


/**
 * Conditional Inupts wrapper component that adds logic.
 */
const DependentInputs: FC<Props> = ( {
    children,
} ) => {

    return (
        <>
            {
                Children.map( children, ( child ) => {
                    const validation = validateChild( child, {
                        elementNames: CHILD_NAMES_LIST,
                    } );

                    if ( validation === 'TextInput' ) {
                        
                    }

                    return child;
                })
            }
        </>
    )
}

export default DependentInputs;