// types
import { ComponentStory, ComponentMeta } from '@storybook/react';
// elements
import { Success as Element } from '../../../elements';

export default {
  title: 'Elements/Loader/Success',
  component: Element,
} as ComponentMeta<typeof Element>;

const Template: ComponentStory<typeof Element> = ( args ) => <Element {...args} />;
export const Success = Template.bind({});
Success.args = {
    ariaLabel: 'success!'
}