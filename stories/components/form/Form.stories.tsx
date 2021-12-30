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

    const fieldSetContent = {
        legend: 'auth',
    }

    const addressContent = {
        label: 'Address',
        placeholder: 'Address',
    }

    return (
        <Component id={id} onSubmit={onSubmit} buttonProps={buttonProps} 
            conditionalDisabled={conditionalDisabled}>
            <FieldSet name='auth' content={fieldSetContent} >
                <TextInput content={addressContent}
                    name='address' type='text' />
            </FieldSet>
            <TextInput type='email' />
            <TextInput type='username' />
            <TextInput type='password' />
            <TextInput content={textContent}
                name='text' type='text' />
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
        auth: [ 'username', 'password' ]
    },
}