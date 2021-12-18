// dependencies
import { FC, Children, cloneElement } from 'react';

interface Props {
    // customization
    id?: string;
    className?: string;
    // states
    onlyOne?: boolean; // only show one accordian at a time
    startActive?: number; // if specified, the corresponding number accordian will be active on render
}

/**
 * Accordian Panel that makes up multiple accordians.
 * Can toggle certain options to change functionality of Accordian Panel.
 */
const AccordianPanel: FC<Props> = ( {
    children,
    id='',
    className='',
    onlyOne=false, // useObjectState and rerender every accordian with an updated isActive
    startActive, // i can do this by changing the isActive state of the corresponding index
} ) => {
    
    // keep track of all accordian active states
    // render children rather than individual accordian

    // i am not going to have access to the children....

    // console.log( Children.count( children ) );
    Children.map( children, ( child, index ) => console.log( child, index ) );

    /* CLASSNAMES */
    const accordianClasses = `
        accordian-wrapper
        ${className}
    `;

    return (
        <section id={id} className={accordianClasses}>
            {
                Children.map( children, ( child, index ) => {
                    if ( startActive === index )
                        return cloneElement( child, {

                        } )
                    else
                        return child;
                } )
            }
            {/* {
                content.map( ( content, index ) => {
                    const isActive = activeAccordian === index ? true : false;
                    return (
                        <Accordian id={id} className={accordianClassName} 
                            content={content} isActive={isActive} index={index}/>
                ) } )
            }
            */}
        </section>
    )
}

export default AccordianPanel;