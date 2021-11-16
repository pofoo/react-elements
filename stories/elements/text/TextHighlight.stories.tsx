// types
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Colors } from '../../../types';
// elements
import { TextHighlight as Element } from '../../../elements';


export default {
  title: 'Elements/Text/Text Highlight',
  component: Element,
} as ComponentMeta<typeof Element>;

const HighlightText = ( args: { color: Colors } ) => {
    return (
        <Element color={args.color}>
            <h1 className='h1'>Hover Me</h1>
        </Element>
    )
}
const Template: ComponentStory<typeof HighlightText> = ( args ) => <HighlightText {...args} />;
export const TextHighlight = Template.bind({});
TextHighlight.args = {
    color: 'blue',
}