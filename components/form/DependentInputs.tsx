// dependencies
import { FC, Children, ReactElement, cloneElement, useRef } from 'react'
// lib
import { validateChild } from '../../lib';
// utils
import checkValid from './checkValid';
// types
import type { CheckFormStatus, DisabledInputs, 
    TextInputConfig, ConditionalDisabled,
    FormFocusedInput } from './types';
import type { SetFormData, FormData } from '../../types';
import type { TextInputProps, Match, TextInputCache } from '../../elements/types';


/* TYPES */
export interface Props {
    // when type is match, all the following inputs have to have the same value as the first input
    depType: 'match';
    // data
    formData?: FormData;
    disabledInputs?: DisabledInputs;
    conditionalDisabled?: ConditionalDisabled;
    autoFocus?: string;
    focusedInput?: FormFocusedInput;
    cache?: TextInputCache;
    // event handlers
    onChange?: SetFormData;
    checkFormStatus?: CheckFormStatus;
}

export interface DependentTextInputConfig extends TextInputConfig {
    match?: Match;
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
    focusedInput,
    cache,
    onChange,
    checkFormStatus,
} ) => {
     /* ERRORS */
     if ( formData === undefined )
        throw( SyntaxError( 'formData not specified - use built in Form wrapper component' ) );

    if ( disabledInputs === undefined )
        throw( SyntaxError( 'disabledInputs not specified - use built in Form wrapper component' ) );

    if ( onChange === undefined && cache === undefined )
        throw( SyntaxError( 'onChange function or cache not specified - use built in Form OR CacheForm wrapper component' ) );

    if ( checkFormStatus === undefined )
        throw( SyntaxError( 'checkFormStatus function not specified - use built in Form wrapper component' ) );

    /* HOOKS */
    const match = useRef<Match>();

    return (
        <>
            {
                Children.map( children, ( child, index ) => {
                    const validation = validateChild( child );

                    if ( validation === 'TextInput' ) {
                        const inputChild = child as ReactElement<TextInputProps>;

                        const name = inputChild.props.name || inputChild.props.type;
                        const prevContent = inputChild.props.content;
                        const inputData = cache ? cache.formData[ name ] : formData[ name ];
                        const value = inputData.value;
                        const resetTouched = inputData.resetTouched;
        
                        const config: DependentTextInputConfig = {
                            content: {
                                ...prevContent,
                                value,
                            },
                            checkFormStatus,
                            checkValid,
                            isValid: inputData.isValid,
                        }

                        if ( resetTouched )
                            config.resetTouched = true;
                        if ( focusedInput )
                            config.focusedInput = focusedInput;
                        if ( disabledInputs.has( name ) )
                            config.disabled = true;
                        if ( conditionalDisabled[ name ] )
                            config.isParentDisabled = true;
                        if ( autoFocus === name )
                            config.autoFocus = true;
                        if ( onChange )
                            config.onChange = onChange;
                        if ( cache )
                            config.cache = cache;

                        if ( depType === 'match' ) {
                            if ( index === 0 )
                                match.current = {
                                    value,
                                    name,
                                }
                            else
                                config.match = match.current;
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