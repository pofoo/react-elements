// types
import { ComponentStory, ComponentMeta } from '@storybook/react';
// elements
import { Dots as Element } from '../../../elements';

export default {
  title: 'Elements/Loader/Dots',
  component: Element,
} as ComponentMeta<typeof Element>;

const Template: ComponentStory<typeof Element> = ( args ) => <Element {...args} />;
export const Dots = Template.bind({});
Dots.args = {
    color: 'green',
}