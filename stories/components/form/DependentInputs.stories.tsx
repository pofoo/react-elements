// types
import { ComponentStory, ComponentMeta } from '@storybook/react';
// components
import { Form, DependentInputs as Component } from '../../../components';
import { TextInput } from '../../../elements';

export default {
  title: 'Components/Form/Dependent Inputs',
  component: Component,
} as ComponentMeta<typeof Component>;

/* TYPES */
interface Props {
    formProps: {
        id: string;
        name: string;
        onSubmit: ( input: { [ key: string ]: string } ) => void;
    },
    buttonProps: {
        buttonContent: {
            text: string;
        };
        buttonAriaLabel: string;
    },
}


const DependentInputsComponent = ( args: Props ) => {
    /* CONTENT */
    const { formProps,  buttonProps } = args;
    const { id, onSubmit, name } = formProps;

    const confirmPasswordContent = {
        label: 'Confirm Password',
    }

    return (
        <Form id={id} onSubmit={onSubmit} 
            buttonProps={buttonProps} name={name}>
            <Component depType='match'>
                <TextInput type='password'/>
                <TextInput name='confirm-password' content={confirmPasswordContent} 
                    type='password'/>
            </Component>
        </Form>
    )
}

const Template: ComponentStory<typeof DependentInputsComponent> = ( args ) => <DependentInputsComponent {...args} />;
export const DependentInputs = Template.bind({});
DependentInputs.args = {
    formProps: {
        id: 'sample-form',
        name: 'sample-form',
        onSubmit: ( input ) => alert( JSON.stringify( input ) ),
    },
    buttonProps: {
        buttonContent: {
            text: 'submit',
        },
        buttonAriaLabel: 'sample form',
    },
}