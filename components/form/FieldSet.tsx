// dependencies
import { FC, Children, ReactElement, cloneElement } from 'react';
// lib
import { validateChild } from '../../lib';
// utils
import checkValid from './checkValid';
// types
import type { CheckFormStatus, FormFocusedInput,
    TextInputConfig, ConditionalDisabled, FormOnChange } from './types';
import type { FormData } from '../../types';
import type { TextInputProps } from '../../elements/types';


/* TYPES */
interface Content {
    legend: string;
}

export interface Props {
    // customization
    id?: string;
    className?: string;
    content: Content;
    name: string;
    // data
    formData?: FormData;
    expandedConditionalDisabled?: ConditionalDisabled;
    focusedInput?: FormFocusedInput;
    // event handlers
    onChange?: FormOnChange;
    checkFormStatus?: CheckFormStatus;
    // states
    disabled?: boolean;
    isParentDisabled?: boolean;
}

/**
 * FieldSet to group form elements.
 */
const FieldSet: FC<Props> = ( {
    children,
    id,
    className='',
    content,
    name,
    formData,
    expandedConditionalDisabled={},
    focusedInput,
    onChange,
    checkFormStatus,
    disabled,
    isParentDisabled,
} ) => {

    /* ERRORS */
    if ( formData === undefined )
        throw( SyntaxError( 'formData not specified - use built in Form wrapper component' ) );

    if ( onChange === undefined )
        throw( SyntaxError( 'onChange function not specified - use built in Form wrapper component' ) );

    if ( checkFormStatus === undefined )
        throw( SyntaxError( 'checkFormStatus function not specified - use built in Form wrapper component' ) );

    /* CONTENT */
    const { legend } = content;
    const formID = id !== undefined ? id : name;

    /* CLASSNAMES */
    const fieldsetClasses = `
        fieldset-wrapper
        ${disabled ? 'disabled' : 'not-disabled'}
        ${className}
    `;

    return (
        <fieldset id={formID} className={fieldsetClasses}
            name={name} disabled={disabled}>
            <legend className='legend'>{legend}</legend>
            {
                Children.map( children, ( child ) => {
                    const validation = validateChild( child );
        
                    // nested FieldSets
                    if ( validation === 'FieldSet' )
                        return child;
        
                    if ( validation === 'TextInput' ) {
                        const inputChild = child as ReactElement<TextInputProps>;
        
                        const name = inputChild.props.name || inputChild.props.type;
                        const prevContent = inputChild.props.content;
                        const inputData = formData[ name ];
                        const resetTouched = inputData.resetTouched;
        
                        const config: TextInputConfig = {
                            content: {
                                ...prevContent,
                                value: inputData.value,
                            },
                            onChange,
                            checkFormStatus,
                            checkValid,
                            isValid: inputData.isValid,
                        }

                        if ( resetTouched )
                            config.resetTouched = true;
                        if ( focusedInput )
                            config.focusedInput = focusedInput;
                        if ( isParentDisabled && expandedConditionalDisabled[ name ] )
                            config.isParentDisabled = true;

                        return cloneElement( inputChild, config );
                    }

                    if ( validation === true )
                        return child;
                } )
            }
        </fieldset>
    )
}

export default FieldSet;