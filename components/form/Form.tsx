// dependencies
import { FC, FormEvent, Children, cloneElement, ReactElement, 
    useState, useEffect } from 'react';
// elements
import { FormButton } from '../../elements';
// lib
import { validateChild } from '../../lib';
// types
import type { FormData } from 'types';
import type { TextInputConfig, FieldSetConfig, ConditionalDisabled } from './types';
import type { Props as FieldSetProps } from './FieldSet';
import type { Props as TextInputProps } from '../../elements/form/TextInput';
// partial functions
import initForm from './initForm';
import transformData from './transformData';
// constants
import { CHILD_NAMES_LIST } from './constants';

/* TYPES */
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

export interface Props {
    id: string;
    className?: string;
    // TO-DO - find a better way to typecheck this
    onSubmit: ( input: { [ key: string ]: string } ) => void;
    buttonProps: ButtonProps;
    conditionalDisabled?: ConditionalDisabled;
    autoFocus?: string; // which input element to focus (based off DOM structure)
}

/**
 * Form wrapper component.
 * Handles form data to submit. 
 * EVERY CHILD NAME ATTRIBUTE MUST BE UNIQUE AS THEY ACT AS THE KEY WITHIN THE OBJECT.
 */
const Form: FC<Props> = ( {
    children,
    id,
    className='',
    onSubmit,
    buttonProps,
    conditionalDisabled={},
    autoFocus,
} ) => {

    /* CONTENT */
    const { buttonContent, 
        buttonAriaLabel, 
        buttonClassName='',
        ...restButtonProps
    } = buttonProps;

    // wrap this in a useMemo
    const [ emptyFormData, 
        canFormSubmit, 
        initialDisabled,
        expandedConditionalDisabled,
    ] = initForm( children, conditionalDisabled );

    /* ERRORS */
    // TO-DO - implement conditionalDisabled errors check
    // should not have the key within the disabled input array -> i.e: { 0: [ 0, 1 ] }

    /* HOOKS */
    // form states
    const [ formData, setFormData ] = useState<FormData>( emptyFormData );
    const [ isFormComplete, setIsFormComplete ] = useState<boolean>( canFormSubmit );
    const [ disabledInputs, setDisabledInputs ] = useState<Set<string>>( initialDisabled );
    // submitting states
    const [ isSubmitting, setIsSubmitting ] = useState<boolean>( false );
    // TO-DO - make this one state object
    // TO-DO - render these as side effects when isSubmitting changes
    const [ formReturn, setFormReturn ] = useState<'success' | 'fail' | null>( null );
    const [ isSuccess, setIsSuccess ] = useState<boolean | null>( null );
    const [ isFail, setIsFail ] = useState<boolean | null>( null );

    /* FUNCTIONS */
    const disableAllInputs = () => {
        // getting all the formData keys and adding them to a new array
        const formElementsArray = ( Object.keys( formData ) ).map( ( key ) => {
            return key;
        } );

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

    const checkFormStatus = ( 
        checkDisabled: boolean,
        name: string,
    ) => {
        let canSubmit = true;
        let newDisabledInputs: Set<string> = new Set();

        ( Object.entries( formData ) ).forEach( ( [ _, rawInput ] ) => {
            const { isValid } = rawInput;
            const childInputs = expandedConditionalDisabled[ name ];

            if ( !isValid ) {
                canSubmit = false; 
                if ( checkDisabled && childInputs ) {
                    console.log( rawInput )
                    console.log( name )
                    console.log( childInputs );
                    childInputs.forEach( input => newDisabledInputs.add( input ) );
                }
            }
        } );

        setIsFormComplete( canSubmit );
        if ( checkDisabled ) {
            // console.log( newDisabledInputs );
            setDisabledInputs( newDisabledInputs );
        }
    }

    /* CLASSNAMES */
    const formClasses = `
        form
        ${className}
    `;

    // submit the form
    useEffect( () => {

    }, [ isSubmitting] );

    console.log( formData );
    // console.log( disabledInputs );
    // console.log( expandedConditionalDisabled );
    
    return (
        <form id={id} className={formClasses} 
            onSubmit={( event: FormEvent ) => onFormSubmit( event, formData )}>
            {
                Children.map( children, ( child ) => {
                    const validation = validateChild( child, {
                        elementNames: CHILD_NAMES_LIST,
                    } );
        
                    if ( validation === 'FieldSet' ) {
                        const fieldSetChild = child as ReactElement<FieldSetProps>;
        
                        const name = fieldSetChild.props.name;

                        const config: FieldSetConfig =  {
                            formData,
                            onChange: setFormData,
                            checkFormStatus,
                            expandedConditionalDisabled,
                        }
        
                        if ( disabledInputs.has( name ) )
                            config[ 'disabled' ] = true;
                        if ( conditionalDisabled[ name ] )
                            config[ 'isParentDisabled' ] = true;
                        
                        return cloneElement( fieldSetChild, config );
                    }

                    if ( validation === 'TextInput' ) {
                        const inputChild = child as ReactElement<TextInputProps>;
        
                        const name = inputChild.props.name || inputChild.props.type;
                        const prevContent = inputChild.props.content;
        
                        const config: TextInputConfig = {
                            formData,
                            onChange: setFormData,
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
        
                        return cloneElement( inputChild, config );
                    }
        
                    if ( validation === true )
                        return child;
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