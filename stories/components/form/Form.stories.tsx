// types
import { ComponentStory, ComponentMeta } from '@storybook/react';
// components
import { Form as Component } from '../../../components';
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
        [ key: number ]: number[];
    }
}

const FormComponent = ( args: Props ) => {
    /* CONTENT */
    const { id, onSubmit, buttonProps, conditionalDisabled={} } = args;

    const textContent = {
        label: 'Text',
        placeholder: 'Text',
    }

    return (
        <Component id={id} onSubmit={onSubmit} buttonProps={buttonProps} 
            conditionalDisabled={conditionalDisabled}>
            <TextInput type='email' />
            <TextInput type='username' />
            <TextInput id='text' content={textContent}
                name='text' type='text' />
            <div id='div1'>
                <div id='div2'>
                    <span id='span1'>I am a span</span>
                </div>
            </div>
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
        0: [ 1 ]
    },
}