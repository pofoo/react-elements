// dependencies
import { ReactNode, Children, ReactElement } from 'react';
// types
import { Props as AccordianProps } from './Accordian';
import type { AccordianStates } from './types';

/**
 * Initialize Accordian Panel initial active states.
 */
const initAccordianPanel = ( 
    children: ReactNode,
    startActiveList: string[],
) => {

    const initialAccordianStates: AccordianStates = {};

    Children.map( children, ( child ) => {
        const accordianChild = child as ReactElement<AccordianProps>;

        const id = accordianChild.props.id;
        const isActive = startActiveList.includes( id );

        initialAccordianStates[ id ] = isActive;
    } );

    return [ initialAccordianStates ];
}

export default initAccordianPanel;