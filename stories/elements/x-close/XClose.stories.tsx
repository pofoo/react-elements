// types
import { ComponentStory, ComponentMeta } from '@storybook/react';
// elements
import { XClose as Element } from '../../../elements';


export default {
  title: 'Elements/X Close',
  component: Element,
} as ComponentMeta<typeof Element>;

const Template: ComponentStory<typeof Element> = ( args ) => <Element {...args} />;
export const XClose = Template.bind({});
XClose.args = {
    onClick: () => null,
    ariaLabel: 'close this thing',
}