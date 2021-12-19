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
    onClick?: ( index: number ) => void;
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
    onClick,
    isActive=false,
    index=0,
} ) => {

    /* CONTENT */
    const labelID = `${id}-label-${index}`;
    const dropdownID = `${id}-dropdown-${index}`;

    /* ACCESSIBILITY */
    const toggleAriaLabel = {
        pressedLabel: `close ${label} content`,
        notPressedLabel: `open ${label} content`,
    }

    /* STATES */
    const [ isAccordianActive, setIsAccordianActive ] = useState<boolean>( isActive );

    /* FUNCTIONS */
    const toggleAccordian = ( index: number ) => {
        setIsAccordianActive( state => !state );
        if ( onClick ) {
            onClick( index );
        }
    }

    let actualActive = isAccordianActive;
    // if an onClick function is provided, the accordian is part of an accordian panel
    // the classNames should be toggled accordingly
    // this is OK because we know the accordian is going to rerender every time in the toggleAccordian function
    if ( onClick ) {
        actualActive = isActive;
    }
    
    /* CLASSNAMES */
    const accordianClasses = `
        accordian-wrapper
        ${className}
        ${actualActive ? 'active' : 'not-active'}
    `;

    return (
        <section id={id} className={accordianClasses}>
            <ToggleButton id={labelID} className='toggle'
                onClick={() => toggleAccordian( index )}
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