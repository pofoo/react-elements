// types
import { ComponentStory, ComponentMeta } from '@storybook/react';
// elements
import { Tag as Element } from '../../../elements';


export default {
  title: 'Element/Tag',
  component: Element,
} as ComponentMeta<typeof Element>;

const Template: ComponentStory<typeof Element> = ( args ) => <Element {...args} />;
export const Tag = Template.bind({});
Tag.args = {
    content: {
        text: 'I am a Tag!'
    }
}