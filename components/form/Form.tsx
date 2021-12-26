// dependencies
import { FC, FormEventHandler, FormEvent,
    Children, cloneElement, useState, useEffect } from 'react';
// elements
import { FormButton } from '../../elements';
// data
import { isObjectEmpty } from '../../lib';
// types
import type { FormData } from 'types';
import type { InputProps } from './types';

/* TYPES */
// type FormEvent = FormEventHandler<HTMLFormElement>;

interface ButtonProps {
    buttonContent: {
        text: string;
    };
    buttonAriaLabel: string;
    buttonClassName?: string;
    size?: 'sm' | 'md' | 'lg';
    color?: 'brand-blue' | 'green' | 'blue' | 'yellow' | 'orange' | 'purple' | 'pink';
    fill?: 'gradient';
    isRounded?: boolean;
    hover?: 'lift' | 'press' | 'pulse' | 'glimmer';
    click?: 'ripple';
}

// key represents the parent input element that other input elements rely on
// the value represents an array of disabled elements
// all disabled elements are considered child inputs and MUST BE greater than the key specified (parent)
// number is in reference to the DOM strcture of the input elements
interface ConditionalDisabled {
    [ key: number ]: number[];
}

interface Props {
    id: string;
    className?: string;
    // TO-DO - find a better way to typecheck this
    onSubmit: ( input: { [ key: string ]: string } ) => void;
    buttonProps: ButtonProps;
    conditionalDisabled?: ConditionalDisabled;
}

/* FUNCTIONS */
/**
 * Cleans up the raw form data input to only have name:value pairs.
 * This is data that will be stored.
 */
const transformData = ( data: FormData ) => {
    const input: { [ key: string ]: string } = {};

    // cleaning up the input to only have name:value pairs
    ( Object.entries( data ) ).forEach( ( [ name, rawInput ] ) => {
        input[ name ] = rawInput.value;
    } );

    return input;
}

const Form: FC<Props> = ( {
    children,
    id,
    className='',
    onSubmit,
    buttonProps,
    conditionalDisabled={},
} ) => {

    /* CONTENT */
    const { buttonContent, 
        buttonAriaLabel, 
        buttonClassName='',
        ...restButtonProps
    } = buttonProps;

    /* HOOKS */
    // form states
    const [ formData, setFormData ] = useState<FormData>( {} );
    const [ isFormComplete, setIsFormComplete ] = useState<boolean>( false );
    // these are only conditionally disabled inputs
    // will not effect prespecified disabled inputs in children
    // TO-DO - make sure these values are unique
    const [ disabledInputs, setDisabledInputs ] = useState<number[]>( [] );
    // submitting states
    const [ isSubmitting, setIsSubmitting ] = useState<boolean>( false );
    const [ isSuccess, setIsSuccess ] = useState<boolean | null>( null );
    const [ isFail, setIsFail ] = useState<boolean | null>( null );

    /* FUNCTIONS */
    const onFormSubmit = ( event: FormEvent, data: FormData ) => {
        event.preventDefault();
        // setIsSubmitting( true );
        // disabled all form elements
        // call the onSubmit function - might want to do this asynchronously and see result to the the states
        onSubmit( transformData( data ) );
        // set isSuccess or isFail depending on result
        // show notification
        // clear form data
    }

    const initFormData = () => {
        const emptyFormData: FormData = {};
        let canFormSubmit: boolean = true;
        const IS_CONDITIONAL = !isObjectEmpty( conditionalDisabled );
        let disabledInputs: number[] = [];

        Children.forEach( children, ( child, index ) => {
            try {
                let name: string;
                let value: string;
                let isValid: boolean;

                // @ts-ignore
                if ( child.type?.displayName === 'FieldSet' ) {
                    // TO-DO - handle this recursively since FieldSets can be nested
                }
                // @ts-ignore
                name = child.props.name;
                // @ts-ignore
                value = child.props.content?.value || '';
                // @ts-ignore
                isValid = !child.props?.required || false;

                if ( !isValid ) canFormSubmit = false;

                emptyFormData[ name ] = {
                    value,
                    isValid,
                };

                if ( IS_CONDITIONAL ) {
                    const parentInput = conditionalDisabled[ index ];
                    if ( parentInput && !isValid ) {
                        disabledInputs.push( ...parentInput );
                    }
                }
            } catch {
                console.warn( `An invalid child was specified: ${child}`)
            }
        } );

        setFormData( emptyFormData );
        setIsFormComplete( canFormSubmit );
        if ( IS_CONDITIONAL ) 
            setDisabledInputs( disabledInputs );
    }

    // ONLY CALL THIS FUNCTION WHEN ONE OF THE CHILD INPUTS ISVALID STATES CHANGES
    // const updateDisabledValues = () => {
    //     let disabledInputs: number[] = [];

    //     if ( !isObjectEmpty( conditionalDisabled ) ) {
    //         Children.forEach( children, ( child, index ) => {
    //             const parentInput = conditionalDisabled[ index ];
    //             // @ts-ignore
    //             const value = child.props.content?.value || '';

    //             if ( parentInput && parentInput.value !== value ) {
    //                 disabledInputs.push( ...conditionalDisabled[ index ].disabledElements );
    //             }
    //         } );

    //         setDisabledInputs( disabledInputs );
    //     }
    // }

    // ONLY CALL THIS FUNCTION WHEN ONE OF THE CHILD INPUTS ISVALID STATES CHANGES
    const updateIsFormComplete = ( checkDisabled: boolean ) => {
        let canSubmit = true;
        ( Object.entries( formData ) ).forEach( ( [ _, rawInput ], index ) => {
            const isInputValid = rawInput.isValid;

            if ( !isInputValid ) 
                canSubmit = false; 
            if ( checkDisabled && conditionalDisabled[ index ] ) {
                if ( isInputValid ) {
                    // remove the disabledElements associated with the parent input   
                }
            }
        } );

        setIsFormComplete( canSubmit );
        if ( checkDisabled )
            setDisabledInputs( [] );
    }

    /* CLASSNAMES */
    const formClasses = `
        form
        ${className}
    `;

    useEffect( () => {
        initFormData();
    }, [] );

    console.log( formData );

    return (
        <form id={id} className={formClasses} 
            onSubmit={( event: FormEvent ) => onFormSubmit( event, formData )}>
            {
                Children.map( children, ( child, index ) => {
                    try {
                        // @ts-ignore
                        const prevContent = child.props.content;
                        // @ts-ignore
                        const name = child.props.name;

                        const config: InputProps = {
                            onChange: setFormData,
                            content: {
                                ...prevContent,
                                value: formData[ name ].value,
                            },
                            updateIsFormComplete,
                        }

                        if ( disabledInputs.includes( index ) )
                            config[ 'disabled' ] = true;
                        if ( conditionalDisabled[ index ] )
                            config[ 'isParentDisabled' ] = true;
    
                        return cloneElement( child as JSX.Element, config );
                    } catch {
                        console.warn( `An invalid child was specified: ${child}`)
                    }
                } )
            }
            <FormButton className={buttonClassName} content={buttonContent} 
                ariaLabel={buttonAriaLabel} isDisabled={isSubmitting || !isFormComplete ? true : false}
                isSuccess={isSuccess ? true : false} isFail={isFail ? true : false}
                {...restButtonProps} />
        </form>
    )
}

export default Form;