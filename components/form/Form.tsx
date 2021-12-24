// dependencies
import { FC, FormEventHandler, Children, cloneElement, useState } from 'react';
// elements
import { FormButton } from '../../elements';
// hooks
import { createListState } from '../../hooks';

/* TYPES */
type FormEvent = FormEventHandler<HTMLFormElement>;

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
    // customization
    id: string;
    className?: string;
    // TO-DO - find a better way to typecheck this
    onSubmit: ( input: { [ key: string ]: any } ) => void;
    buttonProps: ButtonProps;
    focus?: 'first' | number; // which form element to give focus to corresponding to its DOM structure
}

// the onSubmit should look something like this
const exampleOnSubmit = ( input: { [ key: string ]: any } ) => {
    // add anything you want to the input
    const newInput = {
        ...input,
        date: new Date(),
        // anything else...
    }

    // use graphQL mutation
}

const Form: FC<Props> = ( {
    children,
    id,
    className='',
    onSubmit, // this should just collect all the inputs, convert to json, and post to api url
    buttonProps,
    focus,
} ) => {
    
    /* CONTENT */
    const { buttonContent, 
        buttonAriaLabel, 
        buttonClassName='',
        ...restButtonProps
    } = buttonProps;

    /* HOOKS */
    const [ isSubmitting, setIsSubmitting ] = useState<boolean>( false );
    const [ isSuccess, setIsSuccess ] = useState<boolean | null>( null );
    const [ isFail, setIsFail ] = useState<boolean | null>( null );

    const inputStates = createListState<string>( Children.count( children ), {
        initialState: '',
    } );

    const state = {
        name: 'My Name',
        address: 'My Address',
    }

    /* FUNCTIONS */
    const onFormSubmit = ( input: { [ key: string ]: any } ) => {
        setIsSubmitting( true );
        // call the onSubmit function - might want to do this asynchronously and see result to the the states
        onSubmit( input );
        // set isSuccess or isFail depending on result
    }

    /* CLASSNAMES */
    const formClasses = `
        form
        ${className}
    `;

    // this might be a problem with fieldsets
    // how do i handle disbaled states?

    return (
        <form id={id} className={formClasses} onSubmit={onFormSubmit}>
            {
                Children.map( children, ( child, index ) => {
                    // TO-DO - implement focus
                    if ( focus === index ) {}
                    return cloneElement( child as JSX.Element );
                } )
            }
            <FormButton className={buttonClassName} content={buttonContent} 
                ariaLabel={buttonAriaLabel} isDisabled={isSubmitting ? true : false}
                isSuccess={isSuccess ? true : false} isFail={isFail ? true : false}
                {...restButtonProps} />
        </form>
    )
}

export default Form;