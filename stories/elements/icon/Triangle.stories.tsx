// types
import { ComponentStory, ComponentMeta } from '@storybook/react';
// elements
import { Triangle as Icon } from '../../../elements';


export default {
  title: 'Elements/Icon/Triangle',
  component: Icon,
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = ( args ) => <Icon {...args} />;
export const Triangle = Template.bind({});
Triangle.args = {
    ariaLabel: 'I am a Triangle!'
}