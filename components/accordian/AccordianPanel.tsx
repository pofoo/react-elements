// dependencies
import { useEffect, FC, Children, cloneElement } from 'react';
// hooks
import { createObjectState } from '../../hooks';
// lib
import { mapArrayToObject } from '../../lib';

/* TYPES */
interface Props {
    // customization
    id?: string;
    className?: string;
    // states
    onlyOne?: boolean; // only show one accordian at a time
    startActiveList?: number[]; // if specified, the corresponding number accordians will be active on render
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
    startActiveList=[], // i can do this by changing the isActive state of the corresponding index
} ) => {
    
    /* ERRORS */
    if ( startActiveList.length > 1 && onlyOne === true )
        throw( SyntaxError( 'Only one accordian can be open at a time - please only specify one index value in the startActiveList' ) );

    /* HOOKS */
    const createAccordianStates = createObjectState<boolean>( Children.count( children ) )
    const [ accordianStates, setAccordianStates ] = createAccordianStates();

    /* CLASSNAMES */
    const accordianClasses = `
        accordian-wrapper
        ${className}
    `;

    useEffect( () => {
        createAccordianStates.toggle( setAccordianStates, 
            mapArrayToObject( startActiveList, false ),
        );
    }, [] );

    return (
        <section id={id} className={accordianClasses}>
            {
                Children.map( children, ( child, index ) => {
                    if ( startActiveList.includes( index ) )
                        // TO-DO - figure out if this is the right way to do this
                        return cloneElement( child as JSX.Element, {
                            isActive: true,
                        } );
                    else
                        return child;
                } )
            }
        </section>
    )
}

export default AccordianPanel;