// types
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import type { TransformedFormData } from 'types';
// components
import { Form as Component, FieldSet } from '../../../components';
import { TextInput } from '../../../elements';


export default {
  title: 'Components/Form/Form',
  component: Component,
} as ComponentMeta<typeof Component>;

/* TYPES */
interface Input {
    address: string;
    limbo: string;
    email: string;
    username: string;
    password: string;
    moo: string;
    quack: string;
    text: string;
}

interface Props {
    id: string;
    name: string;
    onSubmit: ( input: TransformedFormData<Input> ) => void;
    buttonProps: {
        buttonContent: {
            text: string;
        };
        buttonAriaLabel: string;
    },
    conditionalDisabled: {
        [ name: string ]: string[];
    };
    autoFocus: string;
}

const FormComponent = ( args: Props ) => {
    /* CONTENT */
    const { id, 
        name, 
        onSubmit, 
        buttonProps,
        conditionalDisabled={} } = args;

    const textContent = {
        label: 'Text',
    }

    const fieldSet1Content = {
        legend: 'auth',
    }

    const addressContent = {
        label: 'Address',
    }

    const limboContent = {
        label: 'Limbo',
    }

    const fieldSet2Content = {
        legend: 'bop',
    }

    const mooContent = {
        label: 'Moo',
    }

    const quackContent = {
        label: 'Quack',
    }

    return (
        <Component id={id} onSubmit={onSubmit} buttonProps={buttonProps} 
            name={name} conditionalDisabled={conditionalDisabled}>
            <FieldSet name='auth' content={fieldSet1Content} >
                <TextInput content={addressContent}
                    name='address' type='text' />
                <TextInput content={limboContent}
                    name='limbo' type='text' required />
            </FieldSet>
            <TextInput type='email' />
            <TextInput type='username' />
            <TextInput type='password' />
            <FieldSet name='bop' content={fieldSet2Content} >
                <TextInput content={mooContent}
                    name='moo' type='text' required />
                <TextInput content={quackContent}
                    name='quack' type='text' />
            </FieldSet>
            <TextInput content={textContent}
                name='text' type='text' required />
        </Component>
    )
}

const Template: ComponentStory<typeof FormComponent> = ( args ) => <FormComponent {...args} />;
export const Form = Template.bind({});
Form.args = {
    id: 'sample-form',
    name: 'sample-form',
    onSubmit: ( input: Input ) => alert( JSON.stringify( input ) ),
    buttonProps: {
        buttonContent: {
            text: 'submit',
        },
        buttonAriaLabel: 'sample form',
    },
    conditionalDisabled: {
        email: ['username', 'password', 'fadf' ],
        bop: [ 'text' ],
        // text: [ 'email' ],
    },
}