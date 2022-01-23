// dependencies
import { FC, Children, cloneElement, ReactElement, useState } from 'react';
// lib
import { validateChild } from '../../lib';
// partial functions
import initAccordianPanel from './initAccordianPanel';
// types
import type { Props as AccordianProps } from './Accordian';
import type { AccordianStates } from './types';


/* TYPES */
interface Props {
    // customization
    id: string;
    className?: string;
    // states
    onlyOne?: boolean; // only show one accordian at a time
    // if specified, the corresponding number accordians will be active on render
    // will override any of the children isActive states
    startActiveList?: string[];
}

interface Config {
    isActive: boolean;
    onClick?: ( id: string ) => void;
}

/**
 * Accordian Panel that makes up multiple accordians.
 * Can toggle certain options to change functionality of Accordian Panel.
 */
const AccordianPanel: FC<Props> = ( {
    children,
    id,
    className='',
    onlyOne=false,
    startActiveList=[],
} ) => {

    /* ERRORS */
    if ( startActiveList.length > 1 && onlyOne === true )
        throw( SyntaxError( 'Only one accordian can be open at a time - please only specify one index value in the startActiveList' ) );

    /* CONTENT */
    // TO-DO - wrap this in a useCallback or useMemo
    const [ initalAccordianStates ] = initAccordianPanel( children, startActiveList );

    /* HOOKS */
    const [ accordianStates, setAccordianStates ] = useState<AccordianStates>( initalAccordianStates );

    /* FUNCTIONS */
    const closeOtherAccordians = ( id: string ) => {
        const newAccordianStates: AccordianStates = {};

        ( Object.entries( accordianStates ) ).forEach( ( [ accordianID ] ) => {
            if ( id === accordianID )
                newAccordianStates[ accordianID ] = true;
            else
                newAccordianStates[ accordianID ] = false;
        } );

        setAccordianStates( newAccordianStates );
    }

    /* CLASSNAMES */
    const accordianPanelClasses = `
        accordian-panel-wrapper
        ${className}
    `;

    return (
        <section id={id} className={accordianPanelClasses}>
            {
                Children.map( children, ( child ) => {  
                    const validation = validateChild( child );

                    if ( validation === 'Accordian' ) {
                        const accordianChild = child as ReactElement<AccordianProps>;

                        const id = accordianChild.props.id;

                        const config: Config = {
                            isActive: accordianStates[ id ],
                        };
    
                        if ( onlyOne )
                            config.onClick = closeOtherAccordians;
                        
                        return cloneElement( accordianChild, config );
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