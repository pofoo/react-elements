// dependencies
import { ReactNode, Children, ReactElement } from 'react';
// lib
import { isObjectEmpty, validateChild } from '../../lib';
// types
import { ConditionalDisabled } from './types';
import type { FormData } from 'types';
// TO-DO - this might be better as gerneral Props for inputs
import type { Props as TextInputProps } from '../../elements/form/TextInput';
// constants
import { REQUIRED_TYPES, CHILD_NAME } from './constants';

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
        const validation = validateChild( child, {
            // check for FieldSet
            elementName: CHILD_NAME,
        } );

        // if ( inputChild.type.name === 'FieldSet' ) {
        //     // TO-DO - handle this recursively since FieldSets can be nested
        // }

        if ( validation === 'match' ) {
            let name: string;
            let value: string;
            let isValid: boolean;
            const inputChild = child as ReactElement<TextInputProps>;

            const required: boolean | undefined = inputChild.props.required;
            const type: string = inputChild.props.type;

            name = inputChild.props.name || inputChild.props.type;
            value = inputChild.props.content?.value || '';

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
        }
    } );

    
    return [ emptyFormData, canFormSubmit, initialDisabled ];
}

export default initForm;