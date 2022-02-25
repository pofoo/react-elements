// dependencies
import { FC, FormEvent, Children, cloneElement, ReactElement,
    useMemo, useState, useRef } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
// elements
import { FormButton } from '../../elements';
// lib
import { validateChild, isObjectEmpty, PASSWORD } from '../../lib';
// utils
import checkValid from './checkValid';
// types
import type { FormData, TransformedFormData} from 'types';
import type { TextInputConfig, FieldSetConfig, ConditionalDisabled,
    DependentInputsConfig, DisabledInputs,
    InitialValues, FocusedInput, Cache,
    FieldSetProps, DependentInputsProps } from './types';
import type { TextInputProps } from '../../elements/types';
// partial functions
import initForm from './initForm';
import transformData from './transformData';


/* TYPES */
export type OnSubmit = <T extends object>( input: TransformedFormData<T> ) => 
    ( Promise<boolean | undefined | void> ) | ( boolean | undefined | void );

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
    name: string;
    // data
    initialValues?: InitialValues; // overrides any values placed in input child content prop
    cache: Cache; // cache functions to store formData
    conditionalDisabled?: ConditionalDisabled;
    onSubmit: OnSubmit;
    // styling
    showSubmitAnimation?: boolean;
    buttonProps: ButtonProps;
    // customization
    autoFocus?: string; // which input element to focus (based off DOM structure)
    keepFocus?: boolean; // keeps focus on the last focused input element after the form is submitted
}

/**
 * A from that caches the form input values in browser IndexDB.
 * Utilized dexie as a dependency.
 * NOTE - THIS COMPONENT WILL NOT WORK WITH ANYTHING THAT HAS AN INPUT WITH TYPE PASSWORD
 */
const CacheForm: FC<Props> = ( {
    children,
    id,
    className='',
    name,
    initialValues={},
    cache,
    onSubmit,
    showSubmitAnimation=true,
    buttonProps,
    conditionalDisabled={},
    autoFocus,
    keepFocus,
} ) => {
    /* CONTENT */
    const { buttonContent, 
        buttonAriaLabel, 
        buttonClassName='',
        ...restButtonProps
    } = buttonProps;

    const { getCache, updateCache, clearCache } = cache;

    const { initialFormData,
        canFormSubmit, 
        initialDisabled,
        expandedConditionalDisabled,
    } = useMemo( () => initForm( children, { 
        initialValues,
        conditionalDisabled,
    } ), [] );

    /* ERRORS */
    // TO-DO - implement conditionalDisabled errors check
    // should not have the key within the disabled input array -> i.e: { 0: [ 0, 1 ] }

    /* HOOKS */
    // form states
    const isFirstRender = useRef<boolean>( true );
    const focusedInput = useRef<HTMLInputElement>( null ) as FocusedInput;
    const [ isFormComplete, setIsFormComplete ] = useState<boolean>( canFormSubmit );
    const [ disabledInputs, setDisabledInputs ] = useState<DisabledInputs>( initialDisabled );
    // submitting states
    const [ isSubmitting, setIsSubmitting ] = useState<boolean>( false );
    const [ formReturn, setFormReturn ] = useState<'success' | 'fail' | null>( null );
    const formData = useLiveQuery( async () => {
        const formCache = await getCache();

        if ( formCache && isFirstRender.current ) {
            checkFormStatus( 
                !isObjectEmpty( conditionalDisabled ),
                formCache,
            )

            isFirstRender.current = false;
        }

        return formCache ? formCache : initialFormData;
    } ) as FormData;

    /* FUNCTIONS */
    const disableAllInputs = () => {
        // getting all the formData keys and adding them to a new array
        const formElementsArray = ( Object.keys( formData ) ).map( ( key ) => {
            return key;
        } );

        setDisabledInputs( new Set( formElementsArray ) );

        return disabledInputs;
    }

    const clearForm = ( resetValues: boolean=true ) => {
        const { canFormSubmit,
            initialDisabled, 
        } = initForm( children, {
                initialValues,
                ignoreChildValues: true,
                conditionalDisabled,
                setTouched: true,
            } );

        if ( resetValues ) {
            clearCache();
            setIsFormComplete( canFormSubmit );
        }

        setDisabledInputs( initialDisabled );
    }

    const onFormSubmit = async ( event: FormEvent, data: FormData ) => {
        event.preventDefault();

        setIsSubmitting( true );
        const prevDisabled = disableAllInputs();

        const didFormSubmit = await onSubmit( transformData( data ) );

        if ( didFormSubmit )
            clearForm();
        else if ( didFormSubmit === false )
            setDisabledInputs( prevDisabled );
        else
            clearForm();

        if ( showSubmitAnimation ) {
            setFormReturn( didFormSubmit ? 'success' : 'fail' );
            setTimeout( () => setFormReturn( null ), 1000 );
        }

        if ( keepFocus ) {
            const input = focusedInput.current;

            if ( input )
                input.focus();
        }

        setIsSubmitting( false );
    }

    const checkFormStatus = ( 
        checkDisabled: boolean,
        actualFormData?: FormData,
    ) => {
        let canSubmit = true;
        const newDisabledInputs: Set<string> = new Set();

        ( Object.entries( actualFormData ? actualFormData : formData ) )
            .forEach( ( [ name, rawInput ] ) => {
            const isValid = rawInput.isValid;
            const childInputs = expandedConditionalDisabled[ name ];

            if ( !isValid ) {
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

    if ( !formData ) return null;

    return (
        <form id={id} className={formClasses} name={name}
            onSubmit={( event: FormEvent ) => onFormSubmit( event, formData )}>
            {
                Children.map( children, ( child ) => {
                    const validation = validateChild( child );

                    const cache = {
                        updateCache,
                        formData,
                    }
        
                    if ( validation === 'FieldSet' ) {
                        const fieldSetChild = child as ReactElement<FieldSetProps>;
        
                        const name = fieldSetChild.props.name;

                        const config: FieldSetConfig =  {
                            cache,
                            checkFormStatus,
                            expandedConditionalDisabled,
                        }

                        if ( keepFocus )
                            config.focusedInput = focusedInput;
                        if ( disabledInputs.has( name ) )
                            config.disabled = true;
                        if ( conditionalDisabled[ name ] )
                            config.isParentDisabled = true;
                        
                        return cloneElement( fieldSetChild, config );
                    }

                    if ( validation === 'DependentInputs' ) {
                        const dependentInputsChild = child as ReactElement<DependentInputsProps>;

                        const config: DependentInputsConfig = {
                            conditionalDisabled,
                            disabledInputs,
                            cache,
                            checkFormStatus,
                        }

                        if ( keepFocus )
                            config.focusedInput = focusedInput;

                        return cloneElement( dependentInputsChild, config );
                    }

                    if ( validation === 'TextInput' ) {
                        const inputChild = child as ReactElement<TextInputProps>;
        
                        if ( inputChild.props.type === PASSWORD )
                            throw( SyntaxError( 'Password inputs are not allowed to be in CacheForms' ) );
                        
                        const name = inputChild.props.name || inputChild.props.type;
                        const prevContent = inputChild.props.content;
                        const inputData = formData[ name ];
                        const resetTouched = inputData.resetTouched;
        
                        const config: TextInputConfig = {
                            cache,
                            content: {
                                ...prevContent,
                                value: inputData.value,
                            },
                            checkFormStatus,
                            checkValid,
                            isValid: inputData.isValid,
                        }

                        if ( resetTouched )
                            config.resetTouched = true;
                        if ( keepFocus )
                            config.focusedInput = focusedInput;
                        if ( disabledInputs.has( name ) )
                            config.disabled = true;
                        if ( conditionalDisabled[ name ] )
                            config.isParentDisabled = true;
                        if ( autoFocus === name )
                            config.autoFocus = true;

                        return cloneElement( inputChild, config );
                    }
        
                    if ( validation === true )
                        return child;
                } )
            }
            <div className='submit-button-wrapper'>
                <FormButton className={buttonClassName} content={buttonContent}
                    ariaLabel={buttonAriaLabel} isDisabled={isSubmitting || !isFormComplete}
                    isSuccess={formReturn === 'success'} isFail={formReturn === 'fail'}
                    isLoading={isSubmitting}
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

export default CacheForm;