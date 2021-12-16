// types
import { ComponentStory, ComponentMeta } from '@storybook/react';
// Components
import { Accordian as Component } from '../../../components';


export default {
  title: 'Components/Accordian/Accordian',
  component: Component,
} as ComponentMeta<typeof Component>;

const AccoridanComponent = ( args: any ) => {

  return (
    <Component content={{label: 'Click Me!'}} >
        <i>Hello! I am the Content!</i>
    </Component>
  )
}
const Template: ComponentStory<typeof Component> = ( args ) => <AccoridanComponent {...args} />;
export const Accordian = Template.bind({});
Accordian.args = {
  content: {
    label: 'Click Me!'
  }
}