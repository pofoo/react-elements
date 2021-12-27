// dependencies
import { FC, FormEventHandler, FormEvent,
    Children, cloneElement, useState, useEffect } from 'react';
// elements
import { FormButton } from '../../elements';
// types
import type { FormData } from 'types';
import type { InputProps, ConditionalDisabled } from './types';
// partial functions
import initForm from './initForm';
import transformData from './transformData';
// errors
import { _uniqueChild } from './errors';


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

interface Props {
    id: string;
    className?: string;
    // TO-DO - find a better way to typecheck this
    onSubmit: ( input: { [ key: string ]: string } ) => void;
    buttonProps: ButtonProps;
    conditionalDisabled?: ConditionalDisabled;
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

    const [ emptyFormData, 
        canFormSubmit, 
        initialDisabled 
    ] = initForm( children, conditionalDisabled );

    /* ERRORS */
    // TO-DO - implement conditionalDisabled errors check
    // should not have the key within the disabled input array -> i.e: { 0: [ 0, 1 ] }

    /* HOOKS */
    // form states
    const [ formData, setFormData ] = useState<FormData>( emptyFormData );
    const [ isFormComplete, setIsFormComplete ] = useState<boolean>( canFormSubmit );
    const [ disabledInputs, setDisabledInputs ] = useState<Set<number>>( initialDisabled );
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
    }, [] );

    console.log( formData );
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
                        _uniqueChild( child );
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