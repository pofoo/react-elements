// types
import { ComponentStory, ComponentMeta } from '@storybook/react';
// components
import { Form as Component } from '../../../components';
import { TextInput } from '../../../elements';

export default {
  title: 'Components/Form',
  component: Component,
} as ComponentMeta<typeof Component>;

interface Props {
    id: string;
    onSubmit: ( input: { [ key: string ]: string } ) => void;
    buttonProps: {
        buttonContent: {
            text: string;
        };
        buttonAriaLabel: string;
    }
}

const FormComponent = ( args: Props ) => {

    /* CONTENT */
    const { id, onSubmit, buttonProps } = args;
    const textInputContent1 = {
        label: 'Text Input',
        name: 'name1',
        placeholder: 'placeholder'
    }
    const textInputContent2 = {
        label: 'Text Input',
        name: 'name2',
        placeholder: 'placeholder'
    }

    return (
        <Component id={id} onSubmit={onSubmit} buttonProps={buttonProps} >
            <TextInput id='text-input-1' content={textInputContent1} 
                type='text' onChange={() => {}} />
            <TextInput id='text-input-2' content={textInputContent2} 
                type='text' onChange={() => {}} />
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
    onSubmit: ( input ) => alert( input ),
    buttonProps: {
        buttonContent: {
            text: 'submit',
        },
        buttonAriaLabel: 'sample form'
    }
}