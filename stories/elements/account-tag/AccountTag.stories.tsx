// types
import { ComponentStory, ComponentMeta } from '@storybook/react';
// elements
import { AccountTag as Element } from '../../../elements';


export default {
  title: 'Element/Account Tag',
  component: Element,
} as ComponentMeta<typeof Element>;

const Template: ComponentStory<typeof Element> = ( args ) => <Element {...args} />;
export const AccountTag = Template.bind({});
AccountTag.args = {
    content: {
        name: 'Charlie Lu',
        image: {
          src: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2776&q=80',
          alt: 'Account Image',
        }
    }
}