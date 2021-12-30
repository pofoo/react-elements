// dependencies
import { FC, Children, cloneElement } from 'react';
// hooks
import { createListState } from '../../hooks';
// lib
import { mapArrayToObject, validateChild } from '../../lib';
// constants
import { CHILD_NAMES_LIST } from './constants';

/* TYPES */
interface Props {
    // customization
    id: string;
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
    id,
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
            [ index ]: !accordianStates[ index ],
        } );
    }

    /* CLASSNAMES */
    const accordianPanelClasses = `
        accordian-panel-wrapper
        ${className}
    `;

    return (
        <section id={id} className={accordianPanelClasses}>
            {
                Children.map( children, ( child, index ) => {  
                    const validation = validateChild( child, {
                        elementNames: CHILD_NAMES_LIST,
                    } );

                    if ( validation === 'Accordian' ) {
                        const config: Config = {
                            index,
                            isActive: accordianStates[ index ],
                        };
    
                        if ( onlyOne )
                            config.onClick = closeOtherAccordians;
                        
                        return cloneElement( child as JSX.Element, config );
                    }
                    
                    if ( validation === true ) {
                        return child;
                    }
                } )
            }
        </section>
    )
}

export default AccordianPanel;