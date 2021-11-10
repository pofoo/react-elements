// types
import { ComponentStory, ComponentMeta } from '@storybook/react';
// elements
import { Icon as IconComponent } from '../../../elements';


export default {
  title: 'Element/Icon',
  component: IconComponent,
} as ComponentMeta<typeof IconComponent>;

const Template: ComponentStory<typeof IconComponent> = ( args ) => <IconComponent {...args} />;
export const Icon = Template.bind({});
Icon.args = {
    ariaLabel: 'I am an Icon!'
}