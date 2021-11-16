// types
import { ComponentStory, ComponentMeta } from '@storybook/react';
// components
import { Header as Component } from '../../../../components';


export default {
  title: 'Components/Layout/Header',
  component: Component,
} as ComponentMeta<typeof Component>;

const HeaderComponent = () => {
    return (
        <div style={{height: '300vh'}}>
            <Component />
        </div>
    )
}
const Template: ComponentStory<typeof HeaderComponent> = () => <HeaderComponent />;
export const Header = Template.bind({});