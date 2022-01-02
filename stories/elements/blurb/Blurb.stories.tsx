// types
import { ComponentStory, ComponentMeta } from '@storybook/react';
// components
import { Blurb as Element } from '../../../elements';

export default {
  title: 'Elements/Blurb',
  component: Element,
} as ComponentMeta<typeof Element>;

const BlurbElement = ( args: any ) => {

    return (
        <Element>
            Hello
        </Element>
    )
}
const Template: ComponentStory<typeof BlurbElement> = ( args ) => <BlurbElement {...args} />;
export const Blurb = Template.bind({});
Template.args = {
}