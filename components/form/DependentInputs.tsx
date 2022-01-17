// dependencies
import { FC, Children } from 'react'
// lib
import { validateChild } from '../../lib';

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
                    const validation = validateChild( child );

                    if ( validation === 'TextInput' ) {
                        
                    }

                    return child;
                })
            }
        </>
    )
}

export default DependentInputs;