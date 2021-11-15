// types
import { ComponentStory, ComponentMeta } from '@storybook/react';
// elements
import { NavLink as Element } from '../../../elements';


export default {
  title: 'Element/Nav Link',
  component: Element,
} as ComponentMeta<typeof Element>;

const Template: ComponentStory<typeof Element> = ( args ) => <Element {...args} />;
export const NavLink = Template.bind({});
NavLink.args = {
    content: {
        text: 'Navigate Me!'
    },
    href: '/',
}