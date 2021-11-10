// types
import { ComponentStory, ComponentMeta } from '@storybook/react';
// elements
import { Arrow as Icon } from '../../../elements';


export default {
  title: 'Element/Icon',
  component: Icon,
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = ( args ) => <Icon {...args} />;
export const Arrow = Template.bind({});
Arrow.args = {
    ariaLabel: 'I am an Arrow!'
}