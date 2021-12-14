// dependencies
import { useState, ReactNode } from 'react';
// partials
import Accordian from './Accordian';

/* TYPES */
type Content = {
    label: string;
    dropdown: ReactNode;
}[];

interface Props {
    // customization
    id: string;
    className?: string;
    accordianClassName: string;
    content: Content;
    // states
    onlyOne?: boolean; // only show one accordian at a time
    startActive?: number; // if specified, the corresponding number accordian will be active on render
}

/**
 * Accordian Panel that makes up multiple accordians.
 * Can toggle certain options to change functionality of Accordian Panel.
 */
const AccordianPanel = ( {
    id,
    className='',
    accordianClassName='',
    content,
    onlyOne=false,
    startActive,
}: Props ) => {
    
    /* STATES */
    const [ activeAccordian, setActiveAccordian ] = useState<number | undefined>( startActive );

    /* CLASSNAMES */
    const accordianClasses = `
        accordian-wrapper
        ${className}
    `;

    return (
        <section className={accordianClasses}>
            {
                content.map( ( content, index ) => {
                    const isActive = activeAccordian === index ? true : false;
                    return (
                        <Accordian id={id} className={accordianClassName} 
                            content={content} isActive={isActive} index={index}/>
                ) } )
            }
           
        </section>
    )
}

export default AccordianPanel;