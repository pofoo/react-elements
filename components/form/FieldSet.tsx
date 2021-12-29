// dependencies
import { FC, Children, ReactNode, ReactElement, cloneElement } from 'react';
// lib
import { validateChild } from '../../lib';
// constants
import { CHILD_NAMES_LIST } from './constants';
// types
import type { CheckFormStatus, FieldSetConfig, TextInputConfig } from './types';
import type { SetFormData, FormData } from '../../types';
import type { Props as TextInputProps } from '../../elements/form/TextInput';

/* TYPES */
interface Content {
    legend: string;
}

export interface Props {
    // customization
    id: string;
    className?: string;
    content: Content;
    name: string;
    // data
    formData?: FormData;
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

    /* CLASSNAMES */
    const fieldsetClasses = `
        fieldset-wrapper
        ${disabled ? 'disabled' : 'not-disabled'}
        ${className}
    `;

    const renderChildren = ( children: ReactNode ) => {
        return Children.map( children, ( child ) => {
            const validation = validateChild( child, {
                elementNames: CHILD_NAMES_LIST,
            } );

            // nested FieldSets
            if ( validation === 'FieldSet' ) {
                const fieldSetChild = child as ReactElement<Props>;

                // TO-DO - implement conditionalDisabled
                if ( isParentDisabled ) {}
                
                return fieldSetChild;
            }
            
            if ( validation === 'TextInput' ) {
                const inputChild = child as ReactElement<TextInputProps>;

                const name = inputChild.props.name || inputChild.props.type;
                const prevContent = inputChild.props.content;

                const config: TextInputConfig = {
                    onChange,
                    content: {
                        ...prevContent,
                        value: formData[ name ].value,
                    },
                    checkFormStatus
                }

                return cloneElement( inputChild, config );
            }
        } );
    }

    return (
        <fieldset id={id} className={fieldsetClasses}
            name={name} disabled={disabled}>
            <legend>{legend}</legend>
            {renderChildren( children )}
        </fieldset>
    )
}

export default FieldSet;