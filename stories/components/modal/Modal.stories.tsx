// dependencies
import { useState } from 'react';
// types
import { ComponentStory, ComponentMeta } from '@storybook/react';
// components
import { Modal as Component } from '../../../components';
// elements
import { ToggleButton } from '../../../elements';


export default {
  title: 'Components/Modal',
  component: Component,
} as ComponentMeta<typeof Component>;

const ModalComponent = ( args: { ariaLabelledBy: string, ariaDescribedBy: string } ) => {

    const [ isActive, setIsActive ] = useState<boolean>( false );

    const { ariaLabelledBy, ariaDescribedBy } = args;

    return (
        <>
            <ToggleButton isPressed={isActive} onClick={ () => setIsActive( isActive => !isActive ) }
                ariaLabel='open modal'>
                Open Modal
            </ToggleButton>
            <Component id='modal' isActive={isActive} closeModal={ () => setIsActive( false ) }
                ariaLabelledBy={ariaLabelledBy} ariaDescribedBy={ariaDescribedBy}>
                <h1 id={ariaLabelledBy}>Modal Title</h1>
                <p id={ariaDescribedBy}>I am a Modal Description!</p>
            </Component>
        </>
    )
}
const Template: ComponentStory<typeof ModalComponent> = ( args ) => <ModalComponent {...args} />;
export const Modal = Template.bind({});
Template.args = {
    ariaLabelledBy: 'modal title',
    ariaDescribedBy: 'modal description',
}