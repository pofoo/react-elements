// dependencies
import { useLiveQuery } from 'dexie-react-hooks';
// types
import { ComponentStory, ComponentMeta } from '@storybook/react';
import type { FormOnSubmit } from '../../../components/types';
// components
import { Form as Component } from '../../../components';
// elements
import { TextInput } from '../../../elements';
// db
import { putDexieFormCache } from '../../../db/client/mutations';
import { getDexieFormCache } from '../../../db/client/queries';


export default {
  title: 'Components/Form/Cache Form',
  component: Component,
} as ComponentMeta<typeof Component>;

/* TYPES */
interface Input {
  email: string;
  username: string;
}

interface Props {
  cacheFormProps: {
    id: string;
    name: string;
    onSubmit: FormOnSubmit<Input>;
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

  /* HOOKS */
  const formData = useLiveQuery( async () => {
    const formCache = await getDexieFormCache();

    return formCache;
  } );

  const cache = {
    updateCache: putDexieFormCache,
    cacheFormData: formData,
  }

  if ( !formData ) return null;

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
    name: 'textInputForm',
    onSubmit: async ( input ) => {
      return new Promise( resolve => setTimeout( 
        () => resolve( true ), 800 ) );
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