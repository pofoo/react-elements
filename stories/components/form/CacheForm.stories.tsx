// types
import { ComponentStory, ComponentMeta } from '@storybook/react';
import type { FormOnSubmit } from '../../../components/types';
// components
import { CacheForm as Component } from '../../../components';
// elements
import { TextInput } from '../../../elements';
// db
import { putDexieFormCache, clearDexieFormCache } from '../../../db/client/mutations';
import { getDexieFormCache } from '../../../db/client/queries';


export default {
  title: 'Components/Form/Cache Form',
  component: Component,
} as ComponentMeta<typeof Component>;

/* TYPES */
interface Props {
  cacheFormProps: {
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

const CacheFormComponent = ( args: Props ) => {
  /* CONTENT */
  const { cacheFormProps, type } = args;
  const { id, name, onSubmit, buttonProps } = cacheFormProps;

  const cache = {
    getCache: getDexieFormCache,
    updateCache: putDexieFormCache,
    clearCache: clearDexieFormCache,
  }

  return (
    <Component id={id} name={name} cache={cache}
      onSubmit={onSubmit} buttonProps={buttonProps}>
      <TextInput type={type} />
      <TextInput type='username' />
    </Component>
  )
}

const Template: ComponentStory<typeof CacheFormComponent> = ( args ) => <CacheFormComponent {...args} />;
export const CacheForm = Template.bind({});
CacheForm.args = {
  cacheFormProps: {
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