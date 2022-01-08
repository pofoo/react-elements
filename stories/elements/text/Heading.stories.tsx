// types
import { ComponentStory, ComponentMeta } from '@storybook/react';
// elements
import { Heading as Element } from '../../../elements';


export default {
  title: 'Elements/Text/Heading',
  component: Element,
} as ComponentMeta<typeof Element>;

const Template: ComponentStory<typeof Element> = ( args ) => <Element {...args} />;
export const Heading = Template.bind({});
Heading.args = {
    content: {
        text: 'I am a Heading!'
    },
}