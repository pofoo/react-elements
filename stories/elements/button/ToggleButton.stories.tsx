// dependencies
import { useState } from 'react';
// types
import { ComponentStory, ComponentMeta } from '@storybook/react';
// elements
import { ToggleButton } from '../../../elements';
import { Hamburger, Chevron, Diamond } from '../../../elements';


export default {
  title: 'Element/Button/Toggle Button',
  component: ToggleButton,
} as ComponentMeta<typeof ToggleButton>;

// hamburger
const HamburgerToggle = () => {

  const [ isActive, setIsActive ] = useState<boolean>( false );

  const ariaLabel = {
    pressedLabel: 'open hamburger icon',
    notPressedLabel: 'close hamburger icon',
  }

  return (
    <ToggleButton onClick={() => setIsActive((state) => !state)} 
      isPressed={isActive} ariaLabel={ariaLabel}>
      <Hamburger ariaLabel='hamburger icon' isActive={isActive} />
    </ToggleButton>
  )
}
const HamburgerTemplate: ComponentStory<typeof HamburgerToggle> = () => <HamburgerToggle />
export const ToggleHamburger = HamburgerTemplate.bind({});

// chevron
const ChevronToggle = () => {

  const [ isActive, setIsActive ] = useState<boolean>( false );

  const ariaLabel = {
    pressedLabel: 'open chevron icon',
    notPressedLabel: 'close chevron icon',
  }

  return (
    <ToggleButton onClick={() => setIsActive((state) => !state)} 
      isPressed={isActive} ariaLabel={ariaLabel}>
      <Chevron ariaLabel='chevron icon' direction='down' isActive={isActive} />
    </ToggleButton>
  )
}
const ChevronTemplate: ComponentStory<typeof ChevronToggle> = () => <ChevronToggle />
export const ToggleChevron = ChevronTemplate.bind({});

// diamond
const DiamongToggle = () => {

  const [ isActive, setIsActive ] = useState<boolean>( false );
  const ariaLabel = {
    pressedLabel: 'open diamond icon',
    notPressedLabel: 'close diamond icon',
  }

  return (
    <ToggleButton onClick={() => setIsActive((state) => !state)} isPressed={isActive} 
      ariaLabel={ariaLabel}>
      <div style={{display: 'inline-flex', border: '2px solid black', padding: '5px'}}>
        <span style={{paddingRight: '8px'}}>Click Me</span>
        <Diamond ariaLabel='diamond icon' isActive={isActive} />
      </div>
    </ToggleButton>
  )
}
const DiamondTemplate: ComponentStory<typeof DiamongToggle> = () => <DiamongToggle />
export const ToggleDiamond = DiamondTemplate.bind({});