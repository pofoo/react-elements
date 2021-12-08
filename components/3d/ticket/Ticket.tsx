// dependencies
import { FC, useEffect, useRef, useState } from 'react';
// types
import { TapEvent, ReactTapEvent } from 'types';
import { Distort, Styles, ParentStyles, AnimationStyles } from './types';
// hooks
import { usePointerMove } from '../../../hooks';
// lib
import { getClientCoords, getHalfSizes } from '../../../lib';
// partial functions
import getTicketAnimation from './getTicketAnimation';
// constants
import { colors } from '../../../lib/constants';


/* TYPES */
interface Props {
    // customization
    id?: string;
    className?: string;
    // styling
    isRounded?: boolean;
    animate?: boolean; // whether to continuously animate the ticket
    shadow?: 'brandBlue' | 'green' | 'blue' | 'yellow' | 'orange' | 'purple' | 'pink';
}

/**
 * 3D ticket that follows pointer cursor on hover.
 * If animate is set to true, then the Ticket will continuously animate.
 * Can pass buttons or any other element type in as children for this component.
 */
const Ticket: FC<Props> = ( {
    children,
    id,
    className='',
    isRounded=true,
    animate=true,
    shadow='orange',
} ) => {

    /* CONSTANTS */
    const DROP_SHADOW_COLOR = colors[ shadow ][ 2 ];

    /* HOOKS */
    const ref = useRef<HTMLElement>( null );
    
    const [ styles, setStyles ] = useState<Styles | {}>( {} );
    const [ parentStyles, setParentStyles ] = useState<ParentStyles | {}>( {} );
    const [ animationStyles, setAnimationStyles ] = useState<AnimationStyles | {}>( {} );
    const [ ticketAnimation, setTicketAnimation ] = useState<Animation | null>( null );

    /* FUNCTIONS */
    const animateTicket = () => {
        setStyles( animationStyles );

        ticketAnimation!.play();
    }

    const reset = () => {
        if ( animate ) animateTicket();
        else setStyles( {
               transform: `rotateY(0deg) rotateX(0deg) scale(1)`,
               filter: `drop-shadow(0 10px 15px ${DROP_SHADOW_COLOR})`,
           } );
    }
   
    const initTicket = ( target: HTMLElement ) => {
        const rect = target.getBoundingClientRect();

        setParentStyles( {
            perspective: `${rect.width}px`,
        } );

        if ( animate ) {
            const { animation, ...styles } = getTicketAnimation( ref.current as HTMLElement, DROP_SHADOW_COLOR );
            
            setTicketAnimation( animation );
            setAnimationStyles( styles );
        }
    }

    const make3D = ( 
        event: ReactTapEvent | TapEvent,
        type: ( 'enter' | null )=null,
        distort: Distort={},
    ): void => {
        
        // pause the animation
        if ( type === 'enter' && animate ) ticketAnimation!.pause();

        const target = event.target as HTMLElement;
        const rect = target.getBoundingClientRect();

        /* CONTENT */
        const {
            xDistort=6,
            yDistort=4,
            shadowDistort=3,
        } = distort;

        // TO-DO - test this on a mobile device
        // get the client coordinates for either Mouse or Touch Event
        const [ clientX, clientY ] = getClientCoords( event );
        // half dimensions of the ticket
        const [ halfWidth, halfHeight ] = getHalfSizes( rect );
        
        // position of user's pointer relative to ticket
        const x = Math.abs( rect.x - clientX );
        const y = Math.abs( rect.y - clientY );

        // angles to distort the ticket
        const angleX = ( x - halfWidth ) / xDistort;
        const angleY = ( y - halfHeight ) / yDistort;

        // new shadows relative to cursor
        const xShadow = ( x - halfWidth ) / shadowDistort;
        const yShadow = ( y - halfHeight ) / shadowDistort;

        setStyles( {
            transform: `rotateY(${angleX}deg) rotateX(${angleY}deg) scale(1.15)`,
            perspective: `${halfWidth * 3}px`,
            filter: `drop-shadow(${-xShadow}px ${yShadow}px 15px ${DROP_SHADOW_COLOR})`,
        } );
    }

    /* CLASSNAMES */
    const ticketClasses = `
        ticket-wrapper
        ${className}
        ${isRounded ? 'rounded ': ''}
        ${animate ? 'animate' : ''}
    `;

    useEffect( () => {
        const target = ref.current as HTMLElement;

        // load initial styles and target rect
        initTicket( target );
    }, [] );

    // the default pointerMove does not work in Firefox - using more complete one
    usePointerMove( ref, make3D );

    return (
        <section id={id} ref={ref} className='ticket-container' style={parentStyles}
            onPointerEnter={( event ) => make3D( event, 'enter' )} onPointerLeave={reset}>
            <div className={ticketClasses} style={styles} >{children}</div>
        </section>
    )
}

export default Ticket;