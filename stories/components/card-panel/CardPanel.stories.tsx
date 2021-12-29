// dependencies
import { nanoid } from 'nanoid';
// types
import { ComponentStory, ComponentMeta } from '@storybook/react';
// components
import { CardPanel as Component } from '../../../components';
import { Card } from '../../../elements';


export default {
  title: 'Components/Card Panel',
  component: Component,
} as ComponentMeta<typeof Component>;

const CardPanelComponent = ( args: { isCentered: boolean } ) => {

    return (
        <Component isCentered={args.isCentered}>
            {
                [ ...Array(7) ]
                    .map( () => <Card className='card-panel-card' key={nanoid(5)} /> )
            }
        </Component>
    )
}
const Template: ComponentStory<typeof CardPanelComponent> = ( args ) => <CardPanelComponent {...args} />;
export const CardPanel = Template.bind({});
CardPanel.args = {
    isCentered: true,
}