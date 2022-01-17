// dependencies
import { FC, Children, ReactElement, cloneElement } from 'react'
// lib
import { validateChild } from '../../lib';
// types
import type { CheckFormStatus, DisabledInputs, 
    TextInputConfig, ConditionalDisabled } from './types';
import type { SetFormData, FormData } from '../../types';
import type { Props as TextInputProps } from '../../elements/form/TextInput';

/* TYPES */
export interface Props {
    // when type is match, all the following inputs have to have the same value as the first input
    // it is assumed that all inputs will be of the same name
    depType: 'match';
    // data
    formData?: FormData;
    disabledInputs?: DisabledInputs;
    conditionalDisabled?: ConditionalDisabled;
    autoFocus?: string;
    // event handlers
    onChange?: SetFormData;
    checkFormStatus?: CheckFormStatus;
}


/**
 * Conditional Inupts wrapper component that adds logic.
 */
const DependentInputs: FC<Props> = ( {
    children,
    depType,
    formData,
    disabledInputs,
    conditionalDisabled={},
    autoFocus,
    onChange,
    checkFormStatus,
} ) => {

     /* ERRORS */
     if ( formData === undefined )
        throw( SyntaxError( 'formData not specified - use built in Form wrapper component' ) );

    if ( disabledInputs === undefined )
        throw( SyntaxError( 'disabledInputs not specified - use built in Form wrapper component' ) );
        
    if ( onChange === undefined )
        throw( SyntaxError( 'onChange function not specified - use built in Form wrapper component' ) );

    if ( checkFormStatus === undefined )
        throw( SyntaxError( 'checkFormStatus function not specified - use built in Form wrapper component' ) );

    return (
        <>
            {
                Children.map( children, ( child, index ) => {
                    const validation = validateChild( child );

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
                            checkFormStatus,
                        }
    
                        if ( disabledInputs.has( name ) )
                            config[ 'disabled' ] = true;
                        if ( conditionalDisabled[ name ] )
                            config[ 'isParentDisabled' ] = true;
                        if ( autoFocus === name )
                            config[ 'autoFocus' ] = true;
                        
                        if ( depType === 'match' ) {
                            if ( index === 0 ) {}
                            else {}
                        }

                        return cloneElement( inputChild, config );
                    }
                    if ( validation === true )
                        return child;
                })
            }
        </>
    )
}

export default DependentInputs;