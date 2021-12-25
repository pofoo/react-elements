// dependencies
import { FC, FormEventHandler, FormEvent, 
    Children, cloneElement, useState, useEffect } from 'react';
// elements
import { FormButton } from '../../elements';
// types
import type { FormData } from 'types';

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
// the value is what the parent input element SHOULD be in order for the child elements to NOT be disabled
// disabledElements are all the child input elements
// number is in reference to the DOM strcture of the input elements
interface ConditionalDisabled {
    [ key: number ]: {
        value: string;
        disabledElements: number[];
    }
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
    onSubmit, // this should just collect all the inputs, convert to json, and post to api url
    buttonProps,
    conditionalDisabled,
} ) => {
    
    /* CONTENT */
    const { buttonContent, 
        buttonAriaLabel, 
        buttonClassName='',
        ...restButtonProps
    } = buttonProps;

    /* HOOKS */
    const [ formData, setFormData ] = useState<FormData>( {} );
    // check isFormComplete everytime there is a CHANGE in on the isValid states
    const [ isFormComplete, setIsFormComplete ] = useState<boolean>( false );
    const [ isSubmitting, setIsSubmitting ] = useState<boolean>( false );
    const [ isSuccess, setIsSuccess ] = useState<boolean | null>( null );
    const [ isFail, setIsFail ] = useState<boolean | null>( null );

    /* FUNCTIONS */
    const onFormSubmit = ( event: FormEvent, data: FormData ) => {
        event.preventDefault();
        // setIsSubmitting( true );
        // call the onSubmit function - might want to do this asynchronously and see result to the the states
        onSubmit( transformData( data ) );
        // set isSuccess or isFail depending on result
    }

    const initFormData = () => {
        const emptyFormData: FormData = {};
        let canFormSubmit: boolean = true;

        Children.forEach( children, ( child ) => {
            try {
                let name: string;
                let value: string;
                let isValid: boolean;

                // @ts-ignore
                if ( child.type?.displayName === 'FieldSet' ) {
                    // handle this recursively since FieldSets can be nested
                }
                // @ts-ignore
                name = child.props.content.name;
                // @ts-ignore
                value = child.props.content?.value || '';
                // @ts-ignore
                isValid = !child.props?.required || false;

                if ( !isValid ) canFormSubmit = false;

                emptyFormData[ name ] = {
                    value,
                    isValid,
                };
            } catch {
                console.warn( `An invalid child was specified: ${child}`)
            }
        } );

        setIsFormComplete( canFormSubmit );
        setFormData( emptyFormData );
    }

    // check can form submit everytime form data changes
    const canFormSubmit = () => {
    }

    /* CLASSNAMES */
    const formClasses = `
        form
        ${className}
    `;

    useEffect( () => {
        initFormData();
    }, [] );

    return (
        <form id={id} className={formClasses} onSubmit={( event: FormEvent ) => onFormSubmit( event, formData )}>
            {
                Children.map( children, ( child ) => {
                    // child.type.displayName
                    const JSXChild = child as JSX.Element;
                    // TO-DO - handle disabled
                    if ( conditionalDisabled ) {

                    }
                    return cloneElement( child as JSX.Element );
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