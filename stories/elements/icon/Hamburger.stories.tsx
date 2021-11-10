// types
import { ComponentStory, ComponentMeta } from '@storybook/react';
// elements
import { Hamburger as Icon } from '../../../elements';


export default {
  title: 'Element/Icon',
  component: Icon,
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = ( args ) => <Icon {...args} />;
export const Hamburger = Template.bind({});
Hamburger.args = {
    ariaLabel: 'I am an Hamburger!'
}