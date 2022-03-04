// dependencies
import { useState } from 'react';
// types
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import type { InputFlexOnChange } from 'elements/types';
import type { SetFormData } from 'types';
// elements
import { Textarea as Element } from '../../../elements';


export default {
  title: 'Elements/Form/Textarea',
  component: Element,
} as ComponentMeta<typeof Element>;

/* TYPES */
interface Content {
    label: string;
    placeholder?: string;
    value?: string;
}

interface Props {
    id: string;
    content: Content;
    name: string;
    onChange: InputFlexOnChange | SetFormData;
}

const TextareaElement = ( args: Props ) => {
    /* CONTENT */
    const { id, content, name } = args;
    /* HOOKS */
    const [ value, setValue ] = useState<string>( content.value ? content.value : '' );

    /* FUNCTIONS */
    const onChange = ( content: string ) => {
        setValue( content );
    }

    const actualContent = {
        ...content,
        value,
    }

    return (
        <Element id={id} content={actualContent} name={name}
            onChange={onChange} isInForm={false} />
    )
}

const Template: ComponentStory<typeof TextareaElement> = ( args ) => <TextareaElement {...args} />;
export const Textarea = Template.bind({});
Textarea.args = {
  id: 'textarea',
  content: {
      label: 'This is a textarea',
      placeholder: 'This is a textarea',
  },
  name: 'aTextarea',
}