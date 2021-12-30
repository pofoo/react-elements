// types
import { ComponentStory, ComponentMeta } from '@storybook/react';
// components
import { Form as Component, FieldSet } from '../../../components';
import { TextInput } from '../../../elements';

export default {
  title: 'Components/Form',
  component: Component,
} as ComponentMeta<typeof Component>;

/* TYPES */
interface Props {
    id: string;
    onSubmit: ( input: { [ key: string ]: string } ) => void;
    buttonProps: {
        buttonContent: {
            text: string;
        };
        buttonAriaLabel: string;
    },
    conditionalDisabled: {
        [ id: string ]: string[];
    };
    autoFocus: string;
}


const FormComponent = ( args: Props ) => {
    /* CONTENT */
    const { id, onSubmit, buttonProps, conditionalDisabled={} } = args;

    const textContent = {
        label: 'Text',
        placeholder: 'Text',
    }

    const fieldSet1Content = {
        legend: 'auth',
    }

    const addressContent = {
        label: 'Address',
        placeholder: 'Address',
    }

    const fieldSet2Content = {
        legend: 'bop',
    }

    const mooContent = {
        label: 'Moo',
        placeholder: 'Moo',
    }

    const quackContent = {
        label: 'Quack',
        placeholder: 'Quack',
    }

    return (
        <Component id={id} onSubmit={onSubmit} buttonProps={buttonProps} 
            conditionalDisabled={conditionalDisabled}>
            <FieldSet name='auth' content={fieldSet1Content} >
                <TextInput content={addressContent}
                    name='address' type='text' />
            </FieldSet>
            <TextInput type='email' />
            <TextInput type='username' />
            <TextInput type='password' />
            <TextInput content={textContent}
                name='text' type='text' required />
            <FieldSet name='bop' content={fieldSet2Content} >
                <TextInput content={mooContent}
                    name='moo' type='text' />
                <TextInput content={quackContent}
                    name='quack' type='text' />
            </FieldSet>
        </Component>
    )
}
const Template: ComponentStory<typeof FormComponent> = ( args ) => <FormComponent {...args} />;
export const Form = Template.bind({});
Form.args = {
    id: 'sample-form',
    onSubmit: ( input ) => alert( JSON.stringify( input ) ),
    buttonProps: {
        buttonContent: {
            text: 'submit',
        },
        buttonAriaLabel: 'sample form'
    },
    conditionalDisabled: {
        auth: [ 'username', 'password' ],
        email: ['usename', 'password', 'fadf' ],
        text: [ 'bop' ],
    },
}

const word = [
    {
        parents: [ 'auth', 'email' ],
        conditional: [ 'username', 'password' ],
    },
    {
        parents: [ 'email' ],
        conditional: [ 'fadssf' ],
    }
]