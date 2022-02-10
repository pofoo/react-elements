// types
import { ComponentStory, ComponentMeta } from '@storybook/react';
// Components
import { Panel as Component } from '../../../components';
// public
import Sample from '../../../public/static/icons/sample.svg';

export default {
  title: 'Components/Panel',
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = ( args ) => <Component {...args} />;
export const Panel = Template.bind({});
Panel.args = {
    id: 'panel',
    content: {
        title: 'This is a Panel',
        description: 'Panel description',
        icon: {
            data: Sample,
            alt: 'sample svg',
        }
    }
}