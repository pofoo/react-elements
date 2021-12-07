// dependencies
import { FC, useEffect, useRef, useState } from 'react';
// types
import { TapEvent, ReactTapEvent } from 'types';
import { Distort, Styles, ParentStyles } from './types';
// hooks
import { usePointerMove } from '../../../hooks';
// lib
import { getClientCoords, getHalfSizes } from '../../../lib';
// partial functions
import getTicketAnimation from './getTicketAnimation';


/* TYPES */
interface Props {
    // customization
    id?: string;
    className?: string;
    // styling
    isRounded?: boolean;
    moveColor?: boolean; // whether the background color should be continuously changing and blending
    animate?: boolean; // whether to continuously animate the ticket
    // TO-DO - implement different colors
    color?: 'none' | string;
    shadow?: 'matchColor' | 'black';
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
    moveColor=false,
    animate=false,
    color='',
    shadow='black',
} ) => {

    /* CONSTANTS */
    // TO-DO - implement match color
    const DROP_SHADOW_COLOR = shadow === 'black' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.3)';

    /* HOOKS */
    const ref = useRef<HTMLElement>( null );
    
    const [ styles, setStyles ] = useState<Styles | {}>( {} );
    const [ parentStyles, setParentStyles ] = useState<ParentStyles | {}>( {} );

    // const [ keyframes, setKeyFrames ] = useState<string>( '' );
    // const [ xAnimate, setXAnimate ] = useState<number | null>( null );
    // const [ yAnimate, setYAnimate ] = useState<number | null>( null );
    // const [ xStartAnimate, setXStartAnimate ] = useState<number | null>( null );
    // const [ yStartAnimate, setYStartAnimate ] = useState<number | null>( null );

    /* FUNCTIONS */
    const reset = () => {
        // TO-DO - add default animation for styling
        if ( animate ) {
            // animation keyframes
            const keyframes = getTicketAnimation( ref.current as HTMLElement, DROP_SHADOW_COLOR );
            
            setStyles( {
            } );
        }
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

        // get animation keyframes
        // set ticket animtion
        if ( animate ) {
            const keyframes = getTicketAnimation( ref.current as HTMLElement, DROP_SHADOW_COLOR );
            
            setStyles( {

            } );
        }
    }

    const make3D = ( 
        event: ReactTapEvent | TapEvent,
        distort: Distort={},
    ): void => {

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

        // coords around the center of ticket
        // x: 166
        // y: 48
        // console.log( 'HOVER' );
        // console.log( `x: ${x}`);
        // console.log( `y: ${y}`);

        // haldWidth: 142.625
        // halfHeight: 65.5
        // console.log( `Half Width: ${halfWidth}` );
        // console.log( `Half Height: ${halfHeight}` );

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

    // TO-DO - remove this after testing out color animations
    const toggleOtherAnimation = false;
    /* CLASSNAMES */
    const ticketClasses = `
        ticket-wrapper
        ${className}
        ${isRounded ? 'rounded ': ''}
        ${moveColor ? 'move-color' : ''}
        ${animate ? 'animate' : ''}
        ${toggleOtherAnimation ? 'another-animation' : ''}
        ${color}
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
            onPointerEnter={make3D} onPointerLeave={reset}>
            <div className={ticketClasses} style={styles} >{children}</div>
        </section>
    )
}

export default Ticket;