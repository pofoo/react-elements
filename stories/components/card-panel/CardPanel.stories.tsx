// types
import { ComponentStory, ComponentMeta } from '@storybook/react';
// elements
import { CardPanel as Component } from '../../../components';


export default {
  title: 'Component/Card Panel',
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = ( args ) => <Component {...args} />;
export const CardPanel = Template.bind({});
CardPanel.args = {
}