// types
import { ComponentStory, ComponentMeta } from '@storybook/react';
// elements
import { Line as Icon } from '../../../elements';


export default {
  title: 'Elements/Icon/Line',
  component: Icon,
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = ( args ) => <Icon {...args} />;
export const Line = Template.bind({});
Line.args = {
    ariaLabel: 'I am a Line!'
}