// dependencies
import { useState, ReactNode } from 'react';
// elements
import { ToggleButton } from '../../elements';

/* TYPES */
interface Content {
    label?: string;
    dropdown: ReactNode;
};

interface Props {
    // customization
    id: string;
    className?: string;
    content: Content;
    // states
    isActive?: boolean;
    index: number; // used in case Accordian is placed within AccordianPanel
};

/**
 * Accordian that toggles information.
 */
const Accordian = ( {
    id,
    className='',
    content: {
        label,
        dropdown,
    },
    isActive=false,
    index=0,
}: Props ) => {

    // toggle icon

    /* CONTENT */
    const labelID = `${id}-label-${index}`;
    const dropdownID = `${id}-dropdown-${index}`;

    /* STATES */
    const [ isAccordianActive, setIsAccordianActive ] = useState<boolean>( isActive );

    /* CLASSNAMES */
    const accordianClasses = `
        accordian-wrapper
        ${className}
        ${isAccordianActive ? 'active' : 'not-active'}
    `;

    /* ACCESSIBILITY */
    const toggleAriaLabel = {
        pressedLabel: `close ${label} content`,
        notPressedLabel: `open ${label} content`,
    }

    return (
        <section className={accordianClasses}>
            <ToggleButton id={labelID} className='toggle'
                onClick={() => setIsAccordianActive( state => !state )}
                ariaLabel={toggleAriaLabel} isPressed={isAccordianActive}
                aria-expanded={isAccordianActive} aria-controls={dropdownID}>
                <span className='label'>{label}</span>
                <span className='toggle-icon' aria-label='toggle icon' />
            </ToggleButton>
            <div id={dropdownID} role='region' className='dropdown'
                aria-labelledby={`${id}-label-${index}`}>
                {dropdown}
            </div>
        </section>
    )
}

export default Accordian;