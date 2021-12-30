// dependencies
import { useState, FC } from 'react';
// elements
import { ToggleButton, Chevron } from '../../elements';

/* TYPES */
interface Content {
    label: string;
};

export interface Props {
    // customization
    id: string;
    className?: string;
    content: Content;
    // states
    onClick?: ( id: string ) => void; // onClick of parent Accordian Panel
    isActive?: boolean;
};

/**
 * Accordian that toggles information.
 */
const Accordian: FC<Props> = ( {
    children,
    id,
    className='',
    content,
    onClick,
    isActive=false,
} ) => {

    /* CONTENT */
    const { label } = content;

    const labelID = `${id}-label`;
    const dropdownID = `${id}-dropdown`;

    /* ACCESSIBILITY */
    const toggleAriaLabel = {
        pressedLabel: `close ${label} content`,
        notPressedLabel: `open ${label} content`,
    }

    /* STATES */
    const [ isAccordianActive, setIsAccordianActive ] = useState<boolean>( isActive );

    /* FUNCTIONS */
    const toggleAccordian = ( id: string ) => {
        setIsAccordianActive( state => !state );
        // parent accordian panel onClick function
        if ( onClick ) onClick( id );
    }

    // if an onClick function is provided, the accordian is part of an accordian panel
    // the classNames should be toggled accordingly
    let actualActive = onClick ? isActive : isAccordianActive;

    /* CLASSNAMES */
    const accordianClasses = `
        accordian-wrapper
        ${className}
        ${actualActive ? 'active' : 'not-active'}
    `;

    return (
        <section id={id} className={accordianClasses}>
            <ToggleButton id={labelID} className='toggle'
                onClick={() => toggleAccordian( id )}
                ariaLabel={toggleAriaLabel} isPressed={actualActive}
                aria-expanded={actualActive} aria-controls={dropdownID}>
                <div className='label'>{label}</div>
                <Chevron wrapperClassName='toggle-icon' className='icon' 
                    transition='x-out' direction='down'
                    ariaLabel={`toggle ${label} icon`} isActive={actualActive} />
            </ToggleButton>
            <div id={dropdownID} role='region' className='dropdown'
                aria-labelledby={labelID}>
                {children}
            </div>
        </section>
    )
}

export default Accordian;