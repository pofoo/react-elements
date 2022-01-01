// types
import { ComponentStory, ComponentMeta } from '@storybook/react';
// components
import { Notification as Component } from '../../../components';


export default {
  title: 'Components/Notification',
  component: Component,
} as ComponentMeta<typeof Component>;

const NotificationComponent = ( args: any ) => {

    return (
        <Component id='notification' >
            Notificaiton
        </Component>
    )
}
const Template: ComponentStory<typeof NotificationComponent> = ( args ) => <NotificationComponent {...args} />;
export const Notification = Template.bind({});
Template.args = {
}