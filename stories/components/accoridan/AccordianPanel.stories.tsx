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

const AccordianPanelComponent = ( args: { onlyOne: boolean, startActiveList: number[] } ) => {

    /* CONTENT */
    const { onlyOne=false, startActiveList=[] } = args;

    return (
        <Component id='accordian-panel' onlyOne={onlyOne} startActiveList={startActiveList}>
            {
                [ ...Array(7)].map( ( index ) => 
                    <Accordian key={nanoid(5)} id={`accordian-${index}`} 
                        content={{label: 'Click Me!'}} index={index}>
                        <i>Hello! I am an accordian!</i>
                    </Accordian>
                 )
            }
        </Component>
    )
}

const Template: ComponentStory<typeof AccordianPanelComponent> = ( args ) => <AccordianPanelComponent {...args} />;
export const AccordianPanel = Template.bind({});
AccordianPanel.args = {
    onlyOne: true,
    startActiveList: [ 0 ],
}