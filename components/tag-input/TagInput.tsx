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
}

const TagInput = ( {
    id,
    className,
    content={},
}: Props ) => {
    /* CONSTANTS */
    const TAG_INPUT_NAME = 'tag-input';

    /* HOOKS */
    const [ tags, setTags ] = useState<Tag[]>( [] );

    /* FUNCTIONS */
    const onSubmit = ( input: TransformedFormData<Input> ) => {
        setTags( ( prevTags ) => {
            return [
                {
                    text: input.tagInput,
                },
                ...prevTags,
            ]
        } );
    }

    /* CONTENT */
    const { buttonText='Add Tag' } = content;

    const buttonProps = {
        content: {
            text: buttonText,
        },
        ariaLabel: 'Add Tag',
    }

    const textInputContent = {
        placeholder: 'Tag',
    }

    return (
        <section id={id} className={className}>
            {
                tags.map( ( { text } ) => {
                    return (
                        <Tag content={{text}} />
                    )
                } )
            }
            <Form id='tag-input-form' name='tag-input-form' 
                onSubmit={() => {}} buttonProps={buttonProps}>
                <TextInput id='tag-input' name={TAG_INPUT_NAME} type='text'
                    content={textInputContent} />
            </Form>
        </section>
    )
}
export default TagInput;