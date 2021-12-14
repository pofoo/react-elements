// dependencies
import { useState, ReactNode } from 'react';

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

    /* CONTENT */
    const labelID = `${id}-label-${index}`;
    const dropdownID = `${id}-dropdown-${index}`;

    /* STATES */
    const [ isAccordianActive, setIsAccordianActive ] = useState<boolean>( isActive );

    /* CLASSNAMES */
    const accordianClasses = `
        accordian-wrapper
        ${className}
    `;

    const dropdownClasses = `
        dropdown
        ${isAccordianActive ? 'active' : 'not-active'}
    `;

    return (
        <section className={accordianClasses}>
            <button id={labelID} className='toggle'
                aria-expanded={isAccordianActive} aria-controls={dropdownID}
                onClick={() => setIsAccordianActive( state => !state )}>
                <span className='label'>{label}</span>
                <span className='toggle-icon'></span>
            </button>
            <div id={dropdownID} role='region' className={dropdownClasses}
                aria-labelledby={`${id}-label-${index}`}>
                {dropdown}
            </div>
        </section>
    )
}

export default Accordian;