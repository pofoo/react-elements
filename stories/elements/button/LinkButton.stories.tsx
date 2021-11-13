// types
import { ComponentStory, ComponentMeta } from '@storybook/react';
// elements
import { LinkButton as Button } from '../../../elements';


export default {
  title: 'Element/Button/Link Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = ( args ) => <Button {...args} />;
export const LinkButton = Template.bind({});
LinkButton.args = {
  content: {
    text: 'Take Me There!',
  },
  href: '/',
}