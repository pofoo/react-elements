// dependencies
import { FC, Children, ReactElement, cloneElement } from 'react';
// lib
import { validateChild } from '../../lib';
// utils
import checkValid from './checkValid';
// types
import type { CheckFormStatus, 
    TextInputConfig, ConditionalDisabled } from './types';
import type { SetFormData, FormData } from '../../types';
import type { Props as TextInputProps } from '../../elements/form/TextInput';

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
    // event handlers
    onChange?: SetFormData;
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
        
                        const config: TextInputConfig = {
                            onChange,
                            content: {
                                ...prevContent,
                                value: inputData.value,
                            },
                            checkFormStatus,
                            checkValid,
                            isValid: inputData.isValid,
                        }

                        if ( isParentDisabled && expandedConditionalDisabled[ name ] )
                            config[ 'isParentDisabled' ] = true;

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