// types
import { ComponentStory, ComponentMeta } from '@storybook/react';
// Components
import { TagInput as Component } from '../../../components';

export default {
  title: 'Components/Tag Input',
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = ( args ) => <Component {...args} />;
export const TagInput = Template.bind({});
TagInput.args = {
    id: 'tag-input',
}