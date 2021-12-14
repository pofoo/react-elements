// types
import { ComponentStory, ComponentMeta } from '@storybook/react';
// Components
import { Accordian as Component } from '../../../components';


export default {
  title: 'Components/Accordian/Accordian',
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = ( args ) => <Component {...args} />;
export const Accordian = Template.bind({});
Accordian.args = {
    content: {
        label: 'Click Me!',
        dropdown: <i>Hello! I am the accordian content</i>,
    },
}