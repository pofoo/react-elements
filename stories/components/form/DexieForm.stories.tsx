// types
import { ComponentStory, ComponentMeta } from '@storybook/react';
import type { FormOnSubmit } from '../../../components/types';
// components
import { DexieForm as Component } from '../../../components';
// elements
import { TextInput } from '../../../elements';

export default {
  title: 'Components/Form/Dexie Form',
  component: Component,
} as ComponentMeta<typeof Component>;

/* TYPES */
interface Props {
  dexieFormProps: {
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

const DexieFormComponent = ( args: Props ) => {
  /* CONTENT */
  const { dexieFormProps, type } = args;
  const { id, name, onSubmit, buttonProps } = dexieFormProps;

  return (
    <Component id={id} name={name}
      onSubmit={onSubmit} buttonProps={buttonProps}>
      <TextInput type={type} />
      <TextInput type='username' />
    </Component>
  )
}

const Template: ComponentStory<typeof DexieFormComponent> = ( args ) => <DexieFormComponent {...args} />;
export const DexieForm = Template.bind({});
DexieForm.args = {
  dexieFormProps: {
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