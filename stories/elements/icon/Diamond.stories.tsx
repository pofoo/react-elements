// types
import { ComponentStory, ComponentMeta } from '@storybook/react';
// elements
import { Diamond as Icon } from '../../../elements';


export default {
  title: 'Element/Icon',
  component: Icon,
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = ( args ) => <Icon {...args} />;
export const Diamond = Template.bind({});
Diamond.args = {
    ariaLabel: 'I am a Diamond!'
}