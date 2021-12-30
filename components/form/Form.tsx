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
    autoFocus?: 'first' | number; // which input element to focus (based off DOM structure)
}


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

    // wrap this in a useCallback or useMemo
    const [ emptyFormData, 
        canFormSubmit, 
        initialDisabled 
    ] = initForm( children, conditionalDisabled );

    const focusInput = autoFocus === 'first' ? 0 : autoFocus;

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

    // submit the form
    useEffect( () => {

    }, [ isSubmitting] );

    // console.log( formData );
    // console.log( disabledInputs );
    
    return (
        <form id={id} className={formClasses} 
            onSubmit={( event: FormEvent ) => onFormSubmit( event, formData )}>
            {
                Children.map( children, ( child, index ) => {
                    const validation = validateChild( child, {
                        elementNames: CHILD_NAMES_LIST,
                    } );
        
                    if ( validation === 'FieldSet' ) {
                        const fieldSetChild = child as ReactElement<FieldSetProps>;
        
                        const config: FieldSetConfig =  {
                            formData,
                            onChange: setFormData,
                            checkFormStatus,
                        }
        
                        if ( disabledInputs.has( index ) )
                            config[ 'disabled' ] = true;
                        if ( conditionalDisabled[ index ] )
                            config[ 'isParentDisabled' ] = true;
                        
                        return cloneElement( fieldSetChild, config );
                    }

                    if ( validation === 'TextInput' ) {
                        const inputChild = child as ReactElement<TextInputProps>;
        
                        const name = inputChild.props.name || inputChild.props.type;
                        const prevContent = inputChild.props.content;
        
                        const config: TextInputConfig = {
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
                        if ( focusInput === index )
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