// dependencies
import { ReactNode, Children, ReactElement } from 'react';
// lib
import { isObjectEmpty, validateChild } from '../../lib';
// types
import { ConditionalDisabled } from './types';
import type { FormData } from 'types';
import type { Props as TextInputProps } from '../../elements/form/TextInput';
import type { Props as FieldSetProps } from './FieldSet';
// constants
import { REQUIRED_TYPES, CHILD_NAMES_LIST, UNIQUE_INPUTS } from './constants';

/* TYPES */
type SharedProps = TextInputProps & FieldSetProps;

// TO-DO - find a better way to include children in typescript
interface TextInputPropsWithChildren extends TextInputProps {
    children: ReactNode;
}

/**
 * Initializes data for form wrapper component.
 * Returns empty form data, whether the form can submit, and disabled inputs.
 * Data returned dependent on specified children.
 */
const initForm = ( 
    children: ReactNode,
    conditionalDisabled: ConditionalDisabled={},
): [ FormData, boolean, Set<string> ] => {

    /* CONSTANTS */
    const emptyFormData: FormData = {};
    let canFormSubmit: boolean = true;
    const IS_CONDITIONAL = !isObjectEmpty( conditionalDisabled );
    const initialDisabled: Set<string> = new Set();

    /* HELPER FUNCTIONS */
    const addChildInputs = ( childInputs: string[] ) => {
        childInputs.forEach( input => initialDisabled.add( input ) );
    }
    
    /* MAIN FUNCTION */
    const initChildren = ( children: ReactNode ) => {
        Children.forEach( children, ( child, index ) => {
            const validation = validateChild( child, {
                elementNames: CHILD_NAMES_LIST,
            } );

            const sharedChild = child as ReactElement<SharedProps>;
            
            const name = sharedChild.props.name || sharedChild.props.type;
            let childInputs: ( string[] | null ) = null;

            if ( IS_CONDITIONAL )
                childInputs = conditionalDisabled[ name ];

            /* FORM CHILDREN */
            if ( validation === 'FieldSet' ) {
                const fieldSetChild = child as ReactElement<TextInputPropsWithChildren>;

                if ( childInputs )
                    addChildInputs( childInputs );

                initChildren( fieldSetChild.props.children,  );
            }

            if ( validation === 'TextInput' ) {
                let name: string;
                let value: string;
                let isValid: boolean;
                const inputChild = child as ReactElement<TextInputProps>;
    
                const required: ( boolean | undefined ) = inputChild.props.required;
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

                if ( childInputs && !isValid )
                    addChildInputs( childInputs );
            }
        } );    
    }


    initChildren( children );

    return [ emptyFormData, canFormSubmit, initialDisabled ];
}

export default initForm;