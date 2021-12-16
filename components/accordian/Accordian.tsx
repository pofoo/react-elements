// dependencies
import { useState, FC } from 'react';
// elements
import { ToggleButton, Chevron } from '../../elements';

/* TYPES */
interface Content {
    label?: string;
};

interface Props {
    // customization
    id?: string;
    className?: string;
    content: Content;
    // states
    isActive?: boolean;
    index?: number; // used in case Accordian is placed within AccordianPanel
};

/**
 * Accordian that toggles information.
 */
const Accordian: FC<Props> = ( {
    children,
    id='',
    className='',
    content: {
        label,
    },
    isActive=false,
    index=0,
} ) => {

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
        <section id={id} className={accordianClasses}>
            <ToggleButton id={labelID} className='toggle'
                onClick={() => setIsAccordianActive( state => !state )}
                ariaLabel={toggleAriaLabel} isPressed={isAccordianActive}
                aria-expanded={isAccordianActive} aria-controls={dropdownID}>
                <span className='label'>{label}</span>
                <Chevron className='toggle-icon' transition='x-out' direction='down'
                    ariaLabel={`toggle ${label} icon`} isActive={isAccordianActive} />
            </ToggleButton>
            <div id={dropdownID} role='region' className='dropdown'
                aria-labelledby={labelID}>
                {children}
            </div>
        </section>
    )
}

export default Accordian;