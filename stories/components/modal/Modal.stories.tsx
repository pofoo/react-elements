// dependencies
import { useState } from 'react';
// types
import { ComponentStory, ComponentMeta } from '@storybook/react';
// components
import { Modal as Component } from '../../../components';
// elements
import { ToggleButton, FormButton } from '../../../elements';


export default {
  title: 'Components/Modal',
  component: Component,
} as ComponentMeta<typeof Component>;

const ModalComponent = ( args: any ) => {

    const [ isActive, setIsActive ] = useState<boolean>( false );

    const ariaLabelledBy = 'modal-title';
    const ariaDescribedBy = 'modal-description';

    return (
        <>
            <Component isActive={isActive} toggleModal={ () => setIsActive( isActive => !isActive ) }
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
}