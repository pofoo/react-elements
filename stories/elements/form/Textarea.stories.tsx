// dependencies
import { useState, ChangeEvent } from 'react';
// types
import type { ComponentStory, ComponentMeta } from '@storybook/react';
// import type { FlexOnChange } from '@elements/form/types';
import type { FlexOnChange } from '../../../elements/form/types';
// elements
import { Textarea as Element } from '../../../elements';


export default {
  title: 'Elements/Form/Textarea',
  component: Element,
} as ComponentMeta<typeof Element>;

/* TYPES */
interface Content {
    label: string;
}

interface Props {
    id: string;
    content: Content;
    name: string;
    onChange: FlexOnChange;
}

const TextareaElement = ( args: Props ) => {
    /* HOOKS */
    const [ value, setValue ] = useState<string>( '' );

    /* FUNCTIONS */
    const onChange = ( event: ChangeEvent<HTMLTextAreaElement> ) => {
        setValue( event.target.value );
    }

    /* CONTENT */
    const { id, content, name } = args;

    const actualContent = {
        ...content,
        value,
    }

    return (
        <Element id={id} content={actualContent} name={name}
            onChange={onChange} />
    )
}

const Template: ComponentStory<typeof TextareaElement> = ( args ) => <TextareaElement {...args} />;
export const Textarea = Template.bind({});
Textarea.args = {
  id: 'textarea',
  content: {
      label: 'This is a textarea',
  },
  name: 'aTextarea',
}