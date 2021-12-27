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
 * Cleans up the raw form input data to only have name:value pairs.
 * This is data that will be stored in a database.
 */
const transformData = ( data: FormData ) => {
    const input: { [ key: string ]: string } = {};

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

    /* ERRORS */
    // TO-DO - implement conditionalDisabled errors check
    // should not have the key within the disabled input array -> i.e: { 0: [ 0, 1 ] }

    /* HOOKS */
    // form states
    const [ formData, setFormData ] = useState<FormData>( {} );
    const [ isFormComplete, setIsFormComplete ] = useState<boolean>( false );
    const [ disabledInputs, setDisabledInputs ] = useState<Set<number>>( new Set() );
    // submitting states
    const [ isSubmitting, setIsSubmitting ] = useState<boolean>( false );
    // TO-DO - make this one state object
    // TO-DO - render these as side effects when isSubmitting changes
    const [ formReturn, setFormReturn ] = useState<'success' | 'fail' | null>( null );
    const [ isSuccess, setIsSuccess ] = useState<boolean | null>( null );
    const [ isFail, setIsFail ] = useState<boolean | null>( null );

    /* FUNCTIONS */
    const disableAllInputs = () => {
        // getting the number of form elements in array form -> i.e [ 0, 1, 2 ]
        // numbers represent each input elements order in the dom tree
        const formElementsArray = [ ...Array( 
            Object.keys( formData ).length ).keys() ];

        setDisabledInputs( new Set( formElementsArray ) );
    }

    const onFormSubmit = ( event: FormEvent, data: FormData ) => {
        event.preventDefault();
        setIsSubmitting( true );
        disableAllInputs();
        // call the onSubmit function - might want to do this asynchronously and see result to the the states
        onSubmit( transformData( data ) );
        setTimeout( () => {
            setIsSubmitting( false );
            setDisabledInputs( new Set() );
            // setIsSuccess( true );
            // setTimeout( () => setIsSuccess( false ), 1500 );
            setIsFail( true );
            setTimeout( () => setIsFail( false ), 1500 );
        }, 1000 )
        // set isSuccess or isFail depending on result
        // show notification
        // clear form data
    }

    const initFormData = () => {
        const emptyFormData: FormData = {};
        let canFormSubmit: boolean = true;
        const IS_CONDITIONAL = !isObjectEmpty( conditionalDisabled );
        let disabledInputs: Set<number> = new Set();

        Children.forEach( children, ( child, index ) => {
            // TO-DO - check why non form elements are not getting an error
            try {
                let name: string;
                let value: string;
                let isValid: boolean;

                // @ts-ignore
                if ( child.type?.displayName === 'FieldSet' ) {
                    // TO-DO - handle this recursively since FieldSets can be nested
                }

                // @ts-ignore
                name = child.props.name || child.props.type;
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
                    const childInputs = conditionalDisabled[ index ];
                    if ( childInputs && !isValid )
                        childInputs.forEach( input => disabledInputs.add( input ) );
                }
                // TO-DO - figure out how to handle custom input elements
            } catch {
                console.warn( `An invalid child was specified: ${child}`)
            }
        } );

        setFormData( emptyFormData );
        setIsFormComplete( canFormSubmit );
        if ( IS_CONDITIONAL ) 
            setDisabledInputs( disabledInputs );
        
        return [ emptyFormData, canFormSubmit, disabledInputs ];
    }

    // ONLY CALL THIS FUNCTION WHEN ONE OF THE CHILD INPUTS ISVALID STATES CHANGES
    // TO-DO - check if this function works
    const checkFormStatus = ( checkDisabled: boolean ) => {
        let canSubmit = true;
        let newDisabledInputs: Set<number> = new Set();

        ( Object.entries( formData ) ).forEach( ( [ _, rawInput ], index ) => {
            const isInputValid = rawInput.isValid;
            const childInputs = conditionalDisabled[ index ];

            if ( !isInputValid ) {
                canSubmit = false; 
                if ( checkDisabled && childInputs )
                    childInputs.forEach( input => newDisabledInputs.add( input ) );
            }
        } );

        setIsFormComplete( canSubmit );
        if ( checkDisabled )
            setDisabledInputs( newDisabledInputs );
    }

    /* CLASSNAMES */
    const formClasses = `
        form
        ${className}
    `;

    useEffect( () => {
        initFormData();
    }, [] );

    // console.log( formData );
    // console.log( disabledInputs );
    
    return (
        <form id={id} className={formClasses} 
            onSubmit={( event: FormEvent ) => onFormSubmit( event, formData )}>
            {
                Children.map( children, ( child, index ) => {
                    try {
                        // @ts-ignore
                        const prevContent = child.props.content;
                        // @ts-ignore
                        const name = child.props.name || child.props.type;

                        const config: InputProps = {
                            onChange: setFormData,
                            content: {
                                ...prevContent,
                                value: formData[ name ].value,
                            },
                            checkFormStatus,
                        }

                        if ( disabledInputs.has( index ) )
                            config[ 'disabled' ] = true;
                        if ( conditionalDisabled[ index ] )
                            config[ 'isParentDisabled' ] = true;
    
                        return cloneElement( child as JSX.Element, config );
                    } catch {
                        console.warn( `An invalid child was specified: ${child}`)
                    }
                } )
            }
            <div className='submit-button-wrapper'>
                <FormButton className={buttonClassName} content={buttonContent}
                    ariaLabel={buttonAriaLabel} isDisabled={isSubmitting || !isFormComplete ? true : false}
                    isSuccess={isSuccess ? true : false} isFail={isFail ? true : false}
                    {...restButtonProps} />
            </div>
            {
                // TO-DO - add overall form loader
                isSubmitting && (
                    <span className='loader' role='presentation' />
                )
            }
        </form>
    )
}

export default Form;