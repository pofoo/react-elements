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
        [ name: string ]: string[];
    };
    autoFocus: string;
}


const FormComponent = ( args: Props ) => {
    /* CONTENT */
    const { id, onSubmit, buttonProps, conditionalDisabled={} } = args;

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
            conditionalDisabled={conditionalDisabled}>
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
    onSubmit: ( input ) => alert( JSON.stringify( input ) ),
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

// transform any fieldset keys to its input parts