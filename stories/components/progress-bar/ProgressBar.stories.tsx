// types
import { ComponentStory, ComponentMeta } from '@storybook/react';
// components
import { ProgressBar as Component } from '../../../components';


export default {
  title: 'Component/Progress Bar',
  component: Component,
} as ComponentMeta<typeof Component>;

const ProgressBarComponent = () => {
    return (
        <div style={{height: '300vh'}}>
            <Component styles={{}}/>
        </div>
    )
}
const Template: ComponentStory<typeof ProgressBarComponent> = () => <ProgressBarComponent />;
export const ProgressBar = Template.bind({});
ProgressBar.args = {
}