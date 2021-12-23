// types
import { ComponentStory, ComponentMeta } from '@storybook/react';
// elements
import { Checkbox as Element } from '../../../elements';


export default {
  title: 'Elements/Form/Checkbox',
  component: Element,
} as ComponentMeta<typeof Element>;

const Template: ComponentStory<typeof Element> = ( args ) => <Element {...args} />;
export const Checkbox = Template.bind({});
Checkbox.args = {
  id: 'checkbox',
  content: {
    label: 'This is a Checkbox'
  }
}