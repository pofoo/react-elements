// types
import { ComponentStory, ComponentMeta } from '@storybook/react';
// elements
import { AccountTag as Element } from '../../../elements';


export default {
  title: 'Elements/Account Tag',
  component: Element,
} as ComponentMeta<typeof Element>;

const Template: ComponentStory<typeof Element> = ( args ) => <Element {...args} />;
export const AccountTag = Template.bind({});
AccountTag.args = {
    content: {
        name: 'Charlie Lu',
    }
}