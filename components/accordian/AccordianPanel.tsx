// dependencies
import { FC, Children, cloneElement } from 'react';
// hooks
import { createListState } from '../../hooks';
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

interface Config {
    index: number;
    isActive: boolean;
    onClick?: ( index: number ) => void;
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
    const createAccordianStates = createListState<boolean>( Children.count( children ), {
        uniqueValues: mapArrayToObject( startActiveList, true ),
    } );
    const [ accordianStates, setAccordianStates ] = createAccordianStates();

    /* FUNCTIONS */
    const closeOtherAccordians = ( index: number ) => {
        createAccordianStates.toggle( setAccordianStates, {
            [index]: true,
        } );
    }

    /* CLASSNAMES */
    const accordianClasses = `
        accordian-wrapper
        ${className}
    `;

    return (
        <section id={id} className={accordianClasses}>
            {
                Children.map( children, ( child, index ) => {              
                    const config: Config = {
                        index,
                        isActive: accordianStates[ index ],
                    };

                    if ( onlyOne )
                        config.onClick = closeOtherAccordians;
                    
                    return cloneElement( child as JSX.Element, config );
                } )
            }
        </section>
    )
}

export default AccordianPanel;