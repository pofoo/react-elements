// dependencies
import { useState, useRef } from 'react';
// components
import { Form } from '../form';
// elements
import { Tag, TextInput } from '../../elements';
// lib
import { COLORS, changeArrayIndex } from '../../lib';
// types
import type { TransformedFormData, Colors } from 'types';


/* TYPES */
interface Tag {
    text: string;
}

interface ButtonContent {
    text: string;
}

interface Input {
    tagInput: string;
}

interface Content {
    buttonContent?: ButtonContent;
}

export interface Props {
    id: string;
    className?: string;
    content: Content;
    tagLimit?: number;
    maxTagLength?:number;
    alternateColor?: boolean;
}

const TagInput = ( {
    id,
    className,
    content={},
    tagLimit=3,
    maxTagLength=25,
    alternateColor=true,
}: Props ) => {
    /* HOOKS */
    const colorNames = useRef<Colors[]>( Object.keys( COLORS ) as Colors[] );
    const [ tags, setTags ] = useState<Tag[]>( [] );
    const [ currColors, setCurrColors ] = useState<Colors[]>( 
        [ colorNames.current[ 0 ] ] );
    const [ colorIndex, setColorIndex ] = useState<number>( 1 );

    /* FUNCTIONS */
    const onSubmit = ( input: TransformedFormData<Input> ) => {
        if ( tags.length >= tagLimit ) {
            alert( `You can only have ${tagLimit} tags!` );
            
            return false;
        }
        else {
            setTags( ( prevTags ) => {
                return [
                    ...prevTags,
                    {
                        text: input.tagInput,
                    },
                ]
            } );

            if ( alternateColor ) {
                setCurrColors( ( colors ) => {
                    return [
                        ...colors,
                        colorNames.current[ colorIndex ],
                    ]
                } );
                setColorIndex( ( index ) => {
                    return changeArrayIndex( 
                        index, colorNames.current.length );
                } );
            }
        }
    }

    const deleteTag = ( index: number ) => {
        setTags( ( tags ) => {
            return tags.filter( ( _, i ) => index !== i );
        } );
    }

    /* CONTENT */
    const defaultButtonContent = {
        text: 'Add Tag',
    }

    const { buttonContent=defaultButtonContent } = content;

    const buttonProps = {
        buttonContent,
        buttonAriaLabel: 'Add Tag',
    }

    const textInputContent = {
        placeholder: 'Tag',
        label: 'Tag your blogpost!'
    }

    /* CLASSNAMES */
    const tagInputClasses = `
        tag-input-wrapper
        ${className}
    `;

    return (
        <section id={id} className={tagInputClasses}>
            <div className='tags-wrapper'>
                {
                    tags.map( ( { text }, index ) => {
                        const close = {
                            onClick: () => deleteTag( index ),
                        }

                        return (
                            <Tag key={text} content={{text}} close={close}
                                color={currColors[index]} />
                        )
                    } )
                }
            </div>
            <Form id='tag-input-form' name='tag-input-form' 
                onSubmit={onSubmit} buttonProps={buttonProps}
                showSubmitAnimation={false} keepFocus={true}>
                <TextInput id='tag-input' name='tagInput' type='text'
                    content={textInputContent} required 
                    showValid={false} animateNotValid={false}
                    maxLength={maxTagLength} showRequired={false} />
            </Form>
        </section>
    )
}
export default TagInput;