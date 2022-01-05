// dependencies
import { useState } from 'react';
// types
import { ComponentStory, ComponentMeta } from '@storybook/react';
// components
import { Notification as Component } from '../../../components';
// elements
import { ToggleButton } from '../../../elements';


export default {
  title: 'Components/Notification',
  component: Component,
} as ComponentMeta<typeof Component>;

const NotificationComponent = ( args: any ) => {

    const [ isShow, setIsShow ] = useState( false );
    
    const handleShow = () => {
        setIsShow( true );
    }

    return (
        <>
            <ToggleButton onClick={handleShow} isPressed={isShow}
                ariaLabel='show notification'>
                Show Notification!
            </ToggleButton>
            <Component id='notification' isShow={isShow} setIsShow={setIsShow}>
                Notificaiton
            </Component>
        </>
    )
}

const Template: ComponentStory<typeof NotificationComponent> = ( args ) => <NotificationComponent {...args} />;
export const Notification = Template.bind({});
Template.args = {
}