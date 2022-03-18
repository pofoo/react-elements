// types
import { ComponentStory, ComponentMeta } from '@storybook/react';
// elements
import { Pagination as Element } from '../../../elements';


export default {
  title: 'Elements/Pagination',
  component: Element,
} as ComponentMeta<typeof Element>;

const Template: ComponentStory<typeof Element> = ( args ) => <Element {...args} />;
export const Pagination = Template.bind({});
Pagination.args = {
    totalItems: 1000,
    baseHref: '',
}