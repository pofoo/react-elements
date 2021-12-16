// dependencies
import { nanoid } from 'nanoid';
// types
import { ComponentStory, ComponentMeta } from '@storybook/react';
// Components
import { AccordianPanel as Component, Accordian } from '../../../components';


export default {
  title: 'Components/Accordian/Accordian Panel',
  component: Component,
} as ComponentMeta<typeof Component>;

const AccordianPanelComponent = ( args: any ) => {

    return (
        <Component>
            {
                [ ...Array(7)].map( () => 
                    <Accordian id='card-panel-card' content={{label: 'Click Me!'}} key={nanoid(5)} >
                        <i>Hello! I am an accordian!</i>
                    </Accordian>
                 )
            }
        </Component>

    )
}

const Template: ComponentStory<typeof Component> = ( args ) => <Component {...args} />;
export const AccordianPanel = Template.bind({});
AccordianPanel.args = {
    content: [ 
        {
            label: 'Click Me!',
            dropdown: 'Hello!',
        } 
    ]
}