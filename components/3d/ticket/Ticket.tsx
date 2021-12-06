// dependencies
import { FC, useEffect, useRef, useState } from 'react';
import { useThrottledCallback } from 'use-debounce';
// types
import { TapEvent, ReactTapEvent } from 'types';
import { Distort, Scale, AnimateStart, Styles, ParentStyles } from './types';
// hooks
import { usePointerMove } from '../../../hooks';
// lib
import { getClientCoords } from '../../../lib';


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

    const [ xAnimate, setXAnimate ] = useState<number | null>( null );
    const [ yAnimate, setYAnimate ] = useState<number | null>( null );
    const [ xStartAnimate, setXStartAnimate ] = useState<number | null>( null );
    const [ yStartAnimate, setYStartAnimate ] = useState<number | null>( null );

    /* FUNCTIONS */
    const getHalfSizes = ( rect: DOMRect ) => {
        return [ rect.width / 2, rect.height / 2 ]; 
    }

    const reset = () => {
        setStyles( {
               transform: `rotateY(0deg) rotateX(0deg) scale(1)`,
               filter: `drop-shadow(0 10px 15px ${DROP_SHADOW_COLOR})`,
           } );
       }
   
    const initTicket = ( target: HTMLElement ) => {
        const rect = target.getBoundingClientRect();

        setParentStyles( {
            perspective: `${rect.width}px`,
        } );
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

        // get the client coordinates for either Mouse or Touch Event
        // TO-DO - test this on a mobile device
        const [ clientX, clientY ] = getClientCoords( event );
        // half dimensions of the ticket
        const [ halfWidth, halfHeight ] = getHalfSizes( rect );
        
        // position of user's pointer relative to ticket
        const x = Math.abs( rect.x - clientX );
        const y = Math.abs( rect.y - clientY );

        console.log( 'HOVER' );
        console.log( `x: ${x}`);
        console.log( `y: ${y}`);
        // coords around the center of ticket
        // x: 143
        // y: 85

        // angles to distort the ticket
        const angleX = ( x - halfWidth ) / xDistort;
        const angleY = ( y - halfHeight ) / yDistort;

        // new shadows relative to cursor
        const xShadow = ( x - halfWidth ) / shadowDistort;
        const yShadow = ( y - halfHeight ) / shadowDistort;

        console.log( `SHADOW` );
        console.log( `xShadow: ${xShadow}` );
        console.log( `yShadow: ${yShadow}` );

        setStyles( {
            transform: `rotateY(${angleX}deg) rotateX(${angleY}deg) scale(1.15)`,
            perspective: `${halfWidth * 3}px`,
            filter: `drop-shadow(${-xShadow}px ${yShadow}px 15px ${DROP_SHADOW_COLOR})`,
        } );
    }

    const calcInitialAnimate = (
        target: HTMLElement,
        scale: Scale={},
        animateStart: AnimateStart='right',
    ) => {

        const rect = target.getBoundingClientRect();

        /* CONTENT */
        const { xScale=5, yScale=5 } = scale;

        // half dimensions of the ticket
        const [ halfWidth, halfHeight ] = getHalfSizes( rect );

        // haldWidth: 142.625
        // halfHeight: 65.5
        console.log( `Half Width: ${halfWidth}` );
        console.log( `Half Height: ${halfHeight}` );

        // center coordinates
        // TO-DO - get actual center coordinates
        const xCenter = 142.625;
        const yCenter = 65.5;
        // very bottom right coordinates
        const xRight = rect.right - rect!.left;
        const yRight = rect.bottom - rect!.top;

        // subtract very center coordinates from very bottom right coordinates -> thats the max distance we can animate
        const xMax = xRight - xCenter;
        const yMax = yRight - yCenter;
        // scale the max distance
        const xAnimate = xMax / xScale;
        const yAnimate = yMax / yScale;

        setXAnimate( xAnimate );
        setYAnimate( yAnimate );

        if ( animateStart === 'right' ) {
            setXStartAnimate( xCenter + xAnimate );
            setYStartAnimate( yCenter );
        }
        else if ( animateStart === 'up' ) {
            setXStartAnimate( xCenter );
            setYStartAnimate( yCenter + yAnimate );
        }
        else if ( animateStart === 'left' ) {
            setXStartAnimate( xCenter - xAnimate );
            setYStartAnimate( yCenter );
        }
        else if ( animateStart === 'down' ) {
            setXStartAnimate( xCenter );
            setYStartAnimate( yCenter - yAnimate );
        }
        else {
            throw( `Incorrect animateStart specified: you entered ${animateStart} -> values can be 'left', 'right' 'up', or 'down'`);
        }
    }

    const animateTicket = (
        target: HTMLElement,
        speed: number=0.5,
        increment: number=20, // how often the angles are going to change
        distort: Distort={},
    ) => {

        const rect = target.getBoundingClientRect();

        /* CONTENT */
        const {
            xDistort=18,
            yDistort=12,
            shadowDistort=9,
        } = distort;

        // slower movement of ticket
        const transition = `transform ${speed}s ease-out, filter ${speed}s ease-out`;

        if ( !xAnimate || !yAnimate ) {
            calcInitialAnimate( target );
        }

        // half dimensions of the ticket
        const [ halfWidth, halfHeight ] = getHalfSizes( rect );

        // angle of ticket distort
        let angleX = ( xAnimate! - halfWidth ) / xDistort;
        let angleY = ( yAnimate! - halfHeight ) / yDistort;
        // angle of shadow distort
        let xShadow = ( xAnimate! - halfWidth ) / shadowDistort;
        let yShadow = ( xAnimate! - halfHeight ) / shadowDistort;

        // code the four distinct quadrants
        // you know when to go to the next quadrant when x or y value is equal to center coordinate x or y value
        // go counter clockwise by default
        
        // when the ticket is not being hovered
        while ( !( 'perspective' in styles ) ) {
            console.log( 'hello' );
        }
        // center coordinates

        // console.log( 'SELF ANIMATE' );
        // console.log( `x: ${x}`);
        // console.log( `y: ${y}`);
        // x: 285.25
        // y: 131
        
        // COUNTER-CLOCKWISE
        // I
        // -x, +y

        // II
        // +x, +y

        // III
        // +x, -y

        // IV
        // -x, -y

        // const angleX = ( xRight - halfWidth ) / xDistort;
        // const angleY = ( yRight - halfHeight ) / yDistort;

        // const xShadow = ( xRight - halfWidth ) / shadowDistort;
        // const yShadow = ( yRight - halfHeight ) / shadowDistort;

        // setStyles( {
        //     transform: `rotateY(${angleX}deg) rotateX(${angleY}deg) scale(1.15)`,
        //     perspective: `${halfWidth * 3}px`,
        //     filter: `drop-shadow(${-xShadow}px ${yShadow}px 15px ${DROP_SHADOW_COLOR})`,
        // } );
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
        // animate the ticket
        if ( animate ) animateTicket( target );
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