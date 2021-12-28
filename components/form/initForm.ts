// dependencies
import { ReactNode, Children } from 'react';
// lib
import { isObjectEmpty } from '../../lib';
// types
import { ConditionalDisabled } from './types';
import type { FormData } from 'types';
// errors
import { _uniqueChild } from './_errors';
// constants
import { REQUIRED_TYPES } from './constants';

/**
 * Initializes data for form wrapper component.
 * Returns empty form data, whether the form can submit, and disabled inputs.
 * Data returned dependent on specified children.
 */
// TO-DO - this is getting called on every render - stop that
const initForm = ( 
    children: ReactNode,
    conditionalDisabled: ConditionalDisabled={},
): [ FormData, boolean, Set<number> ] => {

    const emptyFormData: FormData = {};
    let canFormSubmit: boolean = true;
    const IS_CONDITIONAL = !isObjectEmpty( conditionalDisabled );
    const initialDisabled: Set<number> = new Set();

    Children.forEach( children, ( child, index ) => {
        // TO-DO - check why non form elements are not getting an error
        try {
            let name: string;
            let value: string;
            let isValid: boolean;

            // @ts-ignore
            if ( child.type?.displayName === 'FieldSet' ) {
                // TO-DO - handle this recursively since FieldSets can be nested
            }

            // @ts-ignore
            const required: boolean = child.props?.required;
            // @ts-ignore
            const type: string = child.props.type;

            // @ts-ignore
            name = child.props.name || child.props.type;
            // @ts-ignore
            value = child.props.content?.value || '';

            if ( required === undefined && REQUIRED_TYPES.includes( type ) ) 
                isValid = false;
            else 
                isValid = required ? false : true;

            if ( !isValid ) canFormSubmit = false;

            emptyFormData[ name ] = {
                value,
                isValid,
            };

            if ( IS_CONDITIONAL ) {
                const childInputs = conditionalDisabled[ index ];
                if ( childInputs && !isValid )
                    childInputs.forEach( input => initialDisabled.add( input ) );
            }
            // TO-DO - figure out how to handle custom input elements
        } catch {
            _uniqueChild( child );
        }
    } );

    
    return [ emptyFormData, canFormSubmit, initialDisabled ];
}

export default initForm;