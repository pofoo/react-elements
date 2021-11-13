// types
import { ComponentStory, ComponentMeta } from '@storybook/react';
// elements
import { FormButton as Button } from '../../../elements';


export default {
  title: 'Element/Button/Form Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = ( args ) => <Button {...args} />;
export const FormButton = Template.bind({});
FormButton.args = {
  content: {
    text: 'Click Me!',
  }
}

export const SVGFormButton = Template.bind({});
SVGFormButton.args = {
  content: {
    text: 'Click Me!',
    icon: {
      data: '/favicon.svg/',
      alt: 'button SVG'
    }
  }
}