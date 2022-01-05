// types
import { ComponentStory, ComponentMeta } from '@storybook/react';
// elements
import { Puff as Element } from '../../../elements';

export default {
  title: 'Elements/Loader/Puff',
  component: Element,
} as ComponentMeta<typeof Element>;

const Template: ComponentStory<typeof Element> = ( args ) => <Element {...args} />;
export const Puff = Template.bind({});
Puff.args = {
  color: 'green',
}