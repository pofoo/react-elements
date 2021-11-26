// dependencies
import { FC, useEffect, useRef, useState } from 'react';
import { useThrottledCallback } from 'use-debounce';
// types
import { TapEvent, ReactTapEvent } from 'types';
// hooks
import { usePointerMove } from '../../hooks';
// lib
import { getClientCoords } from '../../lib';


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
    shadow?: 'match-color' | 'black';
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
    shadow,
} ) => {

    /* CONSTANTS */
    // TO-DO - implement match color
    const DROP_SHADOW_COLOR = shadow === 'black' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.3)';

    /* TYPES */
    interface Styles {
        transform: string;
        filter: string;
        perspective?: string;
    }

    /* HOOKS */
    const [ styles, setStyles ] = useState<Styles | {}>( {} );
    const [ parentStyles, setParentStyles ] = useState( {} );
    const ref = useRef<HTMLElement>( null );

    /* FUNCTIONS */
    const make3D = ( 
        event: ReactTapEvent | TapEvent,
        distortX: number=6,
        distortY: number=4,
        shadowDistort: number=3,
    ): void => {
        const target = ref.current as HTMLElement;
        const rect = target.getBoundingClientRect();

        // get the client coordinates for either Mouse or Touch Event
        // TO-DO - test this on a mobile device
        const [ clientX, clientY ] = getClientCoords( event );
        
        // position of user's pointer relative to ticket
        const x = Math.abs( rect.x - clientX );
        const y = Math.abs( rect.y - clientY );

        console.log( 'HOVER' );
        console.log( `x: ${x}`);
        console.log( `y: ${y}`);
        // coords around the center of ticket
        // x: 143
        // y: 85

        // half dimensions of the ticket
        const halfWidth = rect.width / 2;
        const halfHeight = rect.height / 2;

        // angles to distort the ticket
        const angleX = ( x - halfWidth ) / distortX;
        const angleY = ( y - halfHeight ) / distortY;

        // new shadows relative to cursor
        const xShadow = ( x - halfWidth ) / shadowDistort;
        const yShadow = ( y - halfHeight ) / shadowDistort;

        setStyles( {
            transform: `rotateY(${angleX}deg) rotateX(${angleY}deg) scale(1.15)`,
            perspective: `${halfWidth * 3}px`,
            filter: `drop-shadow(${-xShadow}px ${yShadow}px 15px ${DROP_SHADOW_COLOR})`,
        } );
    }

    const reset = () => {
     setStyles( {
            transform: `rotateY(0deg) rotateX(0deg) scale(1)`,
            filter: `drop-shadow(0 10px 15px ${DROP_SHADOW_COLOR})`,
        } );
    }

    const initParentStyles = ( target: HTMLElement ) => {
        const halfWidth = target.getBoundingClientRect().width / 2;
        
        setParentStyles( {
            perspective: `${halfWidth * 2}px`,
        } );
    }

    const animateTicket = (
        speed: number=0.5,
        distortX: number=18,
        distortY: number=12,
        shadowDistort: number=9,
        scale: {
            xScale: number,
            yScale: number
        }={
            xScale: 5,
            yScale: 5,
        },
    ) => {
        const target = ref.current as HTMLElement;
        const rect = target.getBoundingClientRect();

        // slower movement of ticket
        const transition = `transform ${speed}s ease-out, filter ${speed}s ease-out`;

        // half dimensions of the ticket
        const halfWidth = rect.width / 2;
        const halfHeight = rect.height / 2;

        console.log( `Half Width: ${halfWidth}` );
        console.log( `Half Height: ${halfHeight}` );
        // haldWidth: 142.625
        // halfHeight: 65.5

        // very bottom right coordinates
        const x = rect.right - rect.left;
        const y = rect.bottom - rect.top;

        // subtract very bottom right coordinates with center coordinates -> thats ur max distance
        // scale the max distance
        // code the four distinct quadrants
        // you know when to go to the next quadrant when x or y value is equal to center coordinate x or y value
        
        // when the ticket is not being hovered
        // while ( !( 'perspective' in styles ) ) {
        //     console.log( 'hello' );
        // }
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

        const angleX = ( x - halfWidth ) / distortX;
        const angleY = ( y - halfHeight ) / distortY;

        const xShadow = ( x - halfWidth ) / shadowDistort;
        const yShadow = ( y - halfHeight ) / shadowDistort;

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
        // load initial styles on component render
        reset();
        initParentStyles( ref.current as HTMLElement );
        animateTicket();
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