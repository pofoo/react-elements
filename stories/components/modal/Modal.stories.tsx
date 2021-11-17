// types
import { ComponentStory, ComponentMeta } from '@storybook/react';
// components
import { Modal as Component } from '../../../components';


export default {
  title: 'Components/Modal',
  component: Component,
} as ComponentMeta<typeof Component>;

const ModalComponent = () => {
    return (
        <Component isActive={false}/>
    )
}
const Template: ComponentStory<typeof ModalComponent> = () => <ModalComponent />;
export const Modal = Template.bind({});