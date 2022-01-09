// types
import { ComponentStory, ComponentMeta } from '@storybook/react';
// Components
import { List as Component } from '../../../components';


export default {
  title: 'Components/List',
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = ( args ) => <Component {...args} />;
export const List = Template.bind({});
List.args = {
    id: 'list',
    content: {
        text: 'I am a List!'
    }
}