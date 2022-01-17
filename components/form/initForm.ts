// dependencies
import { ReactNode, Children, ReactElement } from 'react';
// lib
import { isObjectEmpty, validateChild } from '../../lib';
// types
import { ConditionalDisabled } from './types';
import type { FormData } from 'types';
import type { Props as TextInputProps } from '../../elements/form/TextInput';
import type { Props as DependentInputsProps } from './DependentInputs';
import type { Props as FieldSetProps } from './FieldSet';
// constants
import { REQUIRED_TYPES, UNIQUE_INPUTS } from './constants';

/* TYPES */
export type SharedProps = TextInputProps & FieldSetProps;

// TO-DO - find a better way to include children in typescript
export interface TextInputPropsWithChildren extends TextInputProps {
    children: ReactNode;
}

interface DependentInputPropsWithChildren extends DependentInputsProps {
    children: ReactNode;
}

type FieldSetOptions = {
    prevFieldSetChildInputs?: string[];
}

/**
 * Initializes data for form wrapper component.
 * Returns empty form data, whether the form can submit, and disabled inputs.
 * Data returned dependent on specified children.
 */
const initForm = ( 
    children: ReactNode,
    conditionalDisabled: ConditionalDisabled={},
): [ FormData, boolean, Set<string>, ConditionalDisabled ] => {

    /* CONSTANTS */
    const emptyFormData: FormData = {};
    let canFormSubmit: boolean = true;
    const IS_CONDITIONAL = !isObjectEmpty( conditionalDisabled );
    const initialDisabled: Set<string> = new Set();
    const expandedConditionalDisabled: ConditionalDisabled = {};

    /* HELPER FUNCTIONS */
    const addChildInputs = ( childInputs: string[] ) => {
        childInputs.forEach( input => initialDisabled.add( input ) );
    }

    /* MAIN FUNCTION */
    const initChildren = ( 
        children: ReactNode,
        fieldSetOptions: FieldSetOptions={},
    ) => {
        Children.forEach( children, ( child ) => {
            const validation = validateChild( child );

            const sharedChild = child as ReactElement<SharedProps>;
            let childInputs: ( string[] | undefined ) = undefined;
            const name = sharedChild.props.name || sharedChild.props.type;

            if ( IS_CONDITIONAL )
                childInputs = conditionalDisabled[ name ];

            /* FORM CHILDREN */
            if ( validation === 'FieldSet' ) {
                const fieldSetChild = child as ReactElement<TextInputPropsWithChildren>;

                return initChildren( fieldSetChild.props.children, {
                    prevFieldSetChildInputs: childInputs,
                } );
            }

            if ( validation === 'DependentInputs' ) {
                const depdendentInputsChild = child as ReactElement<DependentInputPropsWithChildren>;

                return initChildren( depdendentInputsChild.props.children );
            }

            if ( validation === 'TextInput' ) {
                const inputChild = child as ReactElement<TextInputProps>;
                let value: string;
                let isValid: boolean;
                const required: ( boolean | undefined ) = inputChild.props.required;
                const type: string = inputChild.props.type;
    
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

                const { prevFieldSetChildInputs } = fieldSetOptions;

                if ( !isValid ) {
                    if ( childInputs ) {
                        expandedConditionalDisabled[ name ] = childInputs;
                        addChildInputs( childInputs );
                    }
                    else if ( prevFieldSetChildInputs ) {
                        expandedConditionalDisabled[ name ] = prevFieldSetChildInputs;
                        addChildInputs( prevFieldSetChildInputs );
                    }
                }
            }
        } );    
    }

    initChildren( children );

    return [ emptyFormData, canFormSubmit, initialDisabled, expandedConditionalDisabled ];
}

export default initForm;