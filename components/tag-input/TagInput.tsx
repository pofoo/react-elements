// dependencies
import { useState } from 'react';
// components
import { Form } from '../form';
// elements
import { Tag, TextInput } from '../../elements';
// types
import type { TransformedFormData } from 'types';


/* TYPES */
interface Tag {
    text: string;
}

interface Input {
    tagInput: string;
}

interface Content {
    buttonText?: string;
}

export interface Props {
    id: string;
    className?: string;
    content: Content;
    tagLimit?: number;
}

const TagInput = ( {
    id,
    className,
    content={},
    tagLimit=3,
}: Props ) => {
    /* HOOKS */
    const [ tags, setTags ] = useState<Tag[]>( [] );

    /* FUNCTIONS */
    const onSubmit = ( input: TransformedFormData<Input> ) => {
        if ( tags.length >= tagLimit ) {
            alert( `You can only have ${tagLimit} tags!` );
            
            return false;
        }
        else
            setTags( ( prevTags ) => {
                return [
                    ...prevTags,
                    {
                        text: input.tagInput,
                    },
                ]
            } );
    }

    /* CONTENT */
    const { buttonText='Add Tag' } = content;

    const buttonProps = {
        buttonContent: {
            text: buttonText,
        },
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
                    tags.map( ( { text } ) => {
                        return (
                            <Tag content={{text}} />
                        )
                    } )
                }
            </div>
            <Form id='tag-input-form' name='tag-input-form' 
                onSubmit={onSubmit} buttonProps={buttonProps}
                showSubmitAnimation={false}>
                <TextInput id='tag-input' name='tagInput' type='text'
                    content={textInputContent} showValid={false} />
            </Form>
        </section>
    )
}
export default TagInput;