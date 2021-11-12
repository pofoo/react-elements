// types
import { ComponentStory, ComponentMeta } from '@storybook/react';
// elements
import { Chevron as Icon } from '../../../elements';


export default {
  title: 'Element/Icon',
  component: Icon,
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = ( args ) => <Icon {...args} />;
export const Chevron = Template.bind({});
Chevron.args = {
    ariaLabel: 'I am a Chevron!'
}