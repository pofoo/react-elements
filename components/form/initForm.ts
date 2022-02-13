// dependencies
import { ReactNode, Children, ReactElement } from 'react';
// utils
import checkValid from './checkValid';
// lib
import { isObjectEmpty, validateChild,
    USERNAME_VALIDATION, EMAIL_VALIDATION, PASSWORD_VALIDATION } from '../../lib';
// types
import { ConditionalDisabled, InitialValues,
    DisabledInputs } from './types';
import type { FormData } from 'types';
import type { TextInputProps, TextInputTypes } from '../../elements/form/types';
import type { Props as DependentInputsProps } from './DependentInputs';
import type { Props as FieldSetProps } from './FieldSet';
// constants
import { REQUIRED_TYPES, UNIQUE_INPUTS } from './constants';

/* TYPES */
interface Options {
    initialValues?: InitialValues;
    ignoreChildValues?: boolean;
    conditionalDisabled?: ConditionalDisabled;
    setTouched?: boolean;
}

export type SharedProps = TextInputProps & FieldSetProps;

// TO-DO - find a better way to include children in typescript
interface TextInputPropsWithChildren extends TextInputProps {
    children: ReactNode;
}

interface DependentInputPropsWithChildren extends DependentInputsProps {
    children: ReactNode;
}

type FieldSetOptions = {
    prevFieldSetChildInputs?: string[];
}

interface InitFormValues {
    initialFormData: FormData,
    canFormSubmit: boolean;
    initialDisabled: DisabledInputs;
    expandedConditionalDisabled: ConditionalDisabled;
}

/**
 * Initializes data for form wrapper component.
 * Returns empty form data, whether the form can submit, and disabled inputs.
 * Data returned dependent on specified children.
 */
const initForm = ( 
    children: ReactNode,
    options: Options,
): InitFormValues => {

    /* CONSTANTS */
    const { initialValues={},
        ignoreChildValues,
        conditionalDisabled={},
        setTouched=false } = options;

    const initialFormData: FormData = {};
    let canFormSubmit: boolean = true;
    const IS_CONDITIONAL = !isObjectEmpty( conditionalDisabled );
    const initialDisabled: DisabledInputs = new Set();
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

            /* FORM CHILDREN */
            if ( validation === 'FieldSet' || validation === 'TextInput' ) {
                const sharedChild = child as ReactElement<SharedProps>;
                let childInputs: ( string[] | undefined ) = undefined;
                const name = sharedChild.props.name || sharedChild.props.type;

                if ( IS_CONDITIONAL )
                    childInputs = conditionalDisabled[ name ];
                
                if ( validation === 'FieldSet' ) {
                    const fieldSetChild = child as ReactElement<TextInputPropsWithChildren>;
    
                    return initChildren( fieldSetChild.props.children, {
                        prevFieldSetChildInputs: childInputs,
                    } );
                }

                if ( validation === 'TextInput' ) {
                    const inputChild = child as ReactElement<TextInputProps>;

                    const initValue = initialValues[ name ];
                    const value = initValue ? initValue : 
                        ignoreChildValues ? '' : inputChild.props.content?.value || '';
                    const type: TextInputTypes = inputChild.props.type;
                    const required = inputChild.props.required || REQUIRED_TYPES.includes ( type ) ?
                        true : false;
                    const match = inputChild.props.match;
    
                    let isValid: boolean;
                    if ( type === 'username' )
                        isValid = required ? checkValid( value, USERNAME_VALIDATION, { match } ) : true;
                    else if ( type === 'email' )
                        isValid = required ? checkValid( value, EMAIL_VALIDATION, { match } ) : true;
                    else if ( type === 'password' )
                        isValid = required ? checkValid( value, PASSWORD_VALIDATION, { match } ) : true;
                    else
                        isValid = required ? value !== '' : true;
                    
                    if ( !isValid ) canFormSubmit = false;
        
                    initialFormData[ name ] = {
                        value,
                        isValid,
                    };

                    if ( setTouched )
                        initialFormData[ name ].resetTouched = true;
    
                    const { prevFieldSetChildInputs } = fieldSetOptions;
    
                    if ( !isValid ) {
                        if ( prevFieldSetChildInputs ) {
                            expandedConditionalDisabled[ name ] = prevFieldSetChildInputs;
                            addChildInputs( prevFieldSetChildInputs );
                        }
                    }
                }
            }

            if ( validation === 'DependentInputs' ) {
                const depdendentInputsChild = child as ReactElement<DependentInputPropsWithChildren>;

                return initChildren( depdendentInputsChild.props.children );
            }
        } );    
    }

    initChildren( children );

    return { initialFormData, canFormSubmit, initialDisabled, expandedConditionalDisabled }
}

export default initForm;