// types
import { ComponentStory, ComponentMeta } from '@storybook/react';
// components
import { Ticket as Component } from '../../../components';


export default {
  title: 'Components/Ticket',
  component: Component,
} as ComponentMeta<typeof Component>;

const TicketComponent = ( args: any ) => {
    return (
        <Component>
            <h2>I am a 3D hoverable ticket!</h2>
        </Component>
    )
}
const Template: ComponentStory<typeof TicketComponent> = ( args ) => <TicketComponent {...args} />;
export const Ticket = Template.bind({});
Ticket.args = {
}