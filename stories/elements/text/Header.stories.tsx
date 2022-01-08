// types
import { ComponentStory, ComponentMeta } from '@storybook/react';
// elements
import { Header as Element } from '../../../elements';


export default {
  title: 'Elements/Text/Header',
  component: Element,
} as ComponentMeta<typeof Element>;

const Template: ComponentStory<typeof Element> = ( args ) => <Element {...args} />;
export const Header = Template.bind({});
Header.args = {
    content: {
        text: 'I am a Header!'
    },
}