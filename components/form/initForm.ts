// dependencies
import { ReactNode, Children, ReactElement } from 'react';
// lib
import { isObjectEmpty, validateChild } from '../../lib';
// types
import { ConditionalDisabled, SharedConfig } from './types';
import type { FormData } from 'types';
import type { Props as TextInputProps } from '../../elements/form/TextInput';
import type { Props as FieldSetProps } from './FieldSet';
// constants
import { REQUIRED_TYPES, CHILD_NAMES_LIST } from './constants';

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

    const initChildren = ( children: ReactNode ) => {
        Children.forEach( children, ( child, index ) => {
            const validation = validateChild( child, {
                elementNames: CHILD_NAMES_LIST,
            } );

            const config: SharedConfig = {
            }

            let isValid: boolean;
            const required: boolean | undefined = child.props.required;
            if ( required === undefined && REQUIRED_TYPES.includes( type ) ) 
                isValid = false;
            else 
                isValid = required ? false : true;
                
            if ( IS_CONDITIONAL ) {
                const childInputs = conditionalDisabled[ index ];
                if ( childInputs && !isValid )
                    childInputs.forEach( input => initialDisabled.add( input ) );
            }

            if ( validation === 'FieldSet' ) {
                const fieldSetChild = child as ReactElement<FieldSetProps>;

                const config = {
                    d
                }

                initChildren( fieldSetChild.props.children );
            }

            if ( validation === 'TextInput' ) {
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
    }


    initChildren( children );

    return [ emptyFormData, canFormSubmit, initialDisabled ];
}

export default initForm;