// types
import { ComponentStory, ComponentMeta } from '@storybook/react';
// elements
import { ToggleButton as Button } from '../../../elements';


export default {
  title: 'Element/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = ( args ) => <Button {...args} />;
export const ToggleButton = Template.bind({});
ToggleButton.args = {
    onClick: () => {},
    ariaLabel: 'I am a button!',
}

// hamburger

// chevron

// arrow

// what if I want text next to the acccessible button?