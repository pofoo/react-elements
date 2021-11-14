// types
import { ComponentStory, ComponentMeta } from '@storybook/react';
// elements
import { Card as Element } from '../../../elements';


export default {
  title: 'Element/Card',
  component: Element,
} as ComponentMeta<typeof Element>;

const Template: ComponentStory<typeof Element> = ( args ) => <Element {...args} />;
export const Card = Template.bind({});
Card.args = {
}