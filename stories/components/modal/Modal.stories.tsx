// types
import { ComponentStory, ComponentMeta } from '@storybook/react';
// components
import { Modal as Component } from '../../../components';


export default {
  title: 'Components/Modal',
  component: Component,
} as ComponentMeta<typeof Component>;

const ModalComponent = ( args: { isActive: boolean } ) => {
    return (
        <Component isActive={args.isActive}/>
    )
}
const Template: ComponentStory<typeof ModalComponent> = ( args ) => <ModalComponent {...args} />;
export const Modal = Template.bind({});
Template.args = {
    isActive: false,
}