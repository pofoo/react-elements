// dependencies
import { FC, useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
// types
import { TapEvent, ReactTapEvent, ConditionalProps } from 'types';
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
/* USE THIS TYPING IN PRODUCTION - DOSEN'T WORK IN STORYBOOK */
// type Props = ConditionalProps<
//     {
//         // customization
//         id?: string;
//         className?: string;
//         // styling
//         isRounded?: boolean;
//         smoothAnimate?: boolean; // whether to continuously animate the ticket with the smooth animation effect
//         showAnimate?: boolean; // whether to continuously animate the ticket with the show off animation effect
//         sparkle?: boolean; // adds a sparkle effect to the ticket
//         shadow?: 'brandBlue' | 'green' | 'blue' | 'yellow' | 'orange' | 'purple' | 'pink';
//     }, 
//         'smoothAnimate', 'sp
//     {
//         // if smoothAnimate is set to true, showAnimate cannot be true
//         smoothAnimate: true;
//         showAnimate: false;
//     }  | 
//     {
//         // if showAnimate is set to true, smoothAnimate cannot be true
//         showAnimate: true;
//         smoothAnimate: false;
//     }
// >

interface Props {
    // customization
    id?: string;
    className?: string;
    // styling
    distort?: Distort;
    isRounded?: boolean;
    scale?: number; // how much to scale the ticke on hover
    smoothAnimate?: boolean; // whether to continuously animate the ticket with the smooth animation effect
    showAnimate?: boolean; // whether to continuously animate the ticket with the show off animation effect
    sparkle?: boolean; // adds a sparkle effect to the ticket
    sparkleHover?: boolean; // adds sparkle effect on hover
    shadow?: 'brandBlue' | 'green' | 'blue' | 'yellow' | 'orange' | 'purple' | 'pink' | 'shadow';
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
    distort={},
    isRounded=true,
    scale=1.15,
    smoothAnimate=false,
    showAnimate=true,
    sparkle=true,
    sparkleHover=false,
    shadow='orange',
} ) => {

    /* ERRORS */
    if ( smoothAnimate && showAnimate ) 
        throw( TypeError('smoothAnimate and showAnimate cannot be both set to true at the same time') );

    /* CONSTANTS */
    const DROP_SHADOW_COLOR = colors[ shadow ][ 2 ];

    /* HOOKS */
    const ref = useRef<HTMLElement>( null );
    
    const [ styles, setStyles ] = useState<Styles | {}>( {} );
    const [ parentStyles, setParentStyles ] = useState<ParentStyles | {}>( {} );
    const [ animationStyles, setAnimationStyles ] = useState<AnimationStyles | {}>( {} );
    const [ ticketAnimation, setTicketAnimation ] = useState<Animation | null>( null );
    const [ isShowAnimate, setIsShowAnimate ] = useState<boolean>( showAnimate ); 

    /* FUNCTIONS */
    const animateTicket = () => {
        setStyles( animationStyles );

        ticketAnimation!.play();
    }

    const reset = () => {
        if ( smoothAnimate ) animateTicket();
        else setStyles( {
               transform: `rotateX(0deg) rotateY(0deg) scale(1)`,
               filter: `drop-shadow(0 10px 15px ${DROP_SHADOW_COLOR})`,
           } );
    }
   
    const initTicket = ( target: HTMLElement ) => {
        const rect = target.getBoundingClientRect();

        setStyles( {
            filter: `drop-shadow(0 10px 15px ${DROP_SHADOW_COLOR})`,
        } );
        setParentStyles( {
            perspective: `${rect.width}px`,
        } );

        if ( smoothAnimate ) {
            const { animation, ...styles } = getTicketAnimation( ref.current as HTMLElement, DROP_SHADOW_COLOR );
            
            setTicketAnimation( animation );
            setAnimationStyles( styles );
        }
    }

    const make3D = ( 
        event: ReactTapEvent | TapEvent,
        distort: Distort,
        type: ( 'enter' | null )=null,
    ): void => {
        // TO-DO implement debounce once the use pointer leaves
        // stop the show off animation
        setIsShowAnimate( false );

        // pause the animation
        if ( type === 'enter' && smoothAnimate ) 
            ticketAnimation!.pause();

        const target = event.target as HTMLElement;
        const rect = target.getBoundingClientRect();

        /* CONTENT */
        // default distort values are suitable for smaller buttons
        // make values bigger for bigg sized elements
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

        const styles = {
            transform: `rotateX(${angleY}deg) rotateY(${angleX}deg) scale(${scale})`,
            perspective: `${halfWidth * 3}px`,
            filter: `drop-shadow(${-xShadow}px ${yShadow}px 15px ${DROP_SHADOW_COLOR})`,
        };

        // TO-DO: add sparkle hover
        // sparkle hover should only be active when sparkle is active
        // DO NOT CHANGE TRANSFORM OR DROP SHADOW FUNCTIONALITY
        if ( sparkleHover ) {}

        setStyles( styles );
    }

    /* CLASSNAMES */
    const ticketClasses = `
        ticket-wrapper
        ${className}
        ${isRounded ? 'rounded ': ''}
        ${isShowAnimate ? 'show-animate' : ''}
        ${sparkle ? 'sparkle' : ''}
    `;

    useEffect( () => {
        const target = ref.current as HTMLElement;

        // load initial styles and target rect
        initTicket( target );
    }, [] );

    // the default pointerMove does not work in Firefox - using more complete one
    usePointerMove( ref, ( event ) => make3D( event, distort ) );

    return (
        <section id={id} ref={ref} className='ticket-container' style={parentStyles}
            onPointerEnter={( event ) => make3D( event, distort, 'enter' )} onPointerLeave={reset}>
            <div className={ticketClasses} style={styles} >{children}</div>
        </section>
    )
}

export default Ticket;