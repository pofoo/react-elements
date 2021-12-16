// types
import { ComponentStory, ComponentMeta } from '@storybook/react';
// Components
import { AccordianPanel as Component } from '../../../components';


export default {
  title: 'Components/Accordian/Accordian Panel',
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = ( args ) => <Component {...args} />;
export const AccordianPanel = Template.bind({});
AccordianPanel.args = {
    content: [ 
        {
            label: 'Click Me!',
            dropdown: 'Hello!',
        } 
    ]
}