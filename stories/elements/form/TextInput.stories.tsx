// types
import { ComponentStory, ComponentMeta } from '@storybook/react';
import type { FormOnSubmit } from '../../../components/types';
// components
import { Form } from '../../../components';
// elements
import { TextInput as Element } from '../../../elements';

export default {
  title: 'Elements/Form/Text Input',
  component: Element,
} as ComponentMeta<typeof Element>;

/* TYPES */
interface Props {
  formProps: {
    id: string;
    name: string;
    onSubmit: FormOnSubmit;
    buttonProps: {
        buttonContent: {
            text: string;
        };
        buttonAriaLabel: string;
    },
  },
  type: 'email' | 'username';
}

const TextInputElement = ( args: Props ) => {

  /* CONTENT */
  const { formProps, type } = args;
  const { id, name, onSubmit, buttonProps } = formProps;

  return (
    <Form id={id} name={name}
      onSubmit={onSubmit} buttonProps={buttonProps}>
      <Element type={type} />
      <Element type='username' />
    </Form>
  )
}

const Template: ComponentStory<typeof TextInputElement> = ( args ) => <TextInputElement {...args} />;
export const TextInput = Template.bind({});
TextInput.args = {
  formProps: {
    id: 'text-input-form',
    name: 'text-input-form',
    onSubmit: async ( input ) => {
      await setTimeout( 
        () => alert( JSON.stringify( input ) ), 
        500 );
    },
    buttonProps: {
      buttonContent: {
        text: 'submit',
      },
      buttonAriaLabel: 'text input form',
    },
  },
  type: 'email',
}