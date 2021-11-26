// dependencies
import { FC, useEffect, useRef, useState } from 'react';
// types
import { TapEvent, ReactTapEvent } from 'types';
// lib / events
import { usePointerMove } from '../../hooks';


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
 * THIS THIS COMPONENT DOES NOT WORK IN FIREFOX.
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
    const ref = useRef<HTMLDivElement>( null );

    /* FUNCTIONS */
    const make3D = ( 
        event: ReactTapEvent | TapEvent,
        // event: TouchEvent,
        distortX: number=6,
        distortY: number=4,
    ): void => {
        const target = ref.current as HTMLElement;
        const rect = target.getBoundingClientRect();

        // const { targetTouches=null } = event; 
        // let clientX;
        // let clientY;
        // if ( targetTouches ) {
        //     const lastIndex = targetTouches.length - 1;
        //     clientX = targetTouches[ lastIndex ];
        //     clientY = targetTouches[ lastIndex ]
        // }
        // else {
        //     clientX = event.clientX;
        //     clientY = event.clientY
        // }

        // // TO-DO - take into account for both MouseEvent and TouchEvent
        // // this is only supported with React Tap Events
        // if ( event.nativeEvent instanceof TouchEvent ) {

        // }
        // position of user's pointer relative to ticket
        const x = Math.abs( rect.x - event.clientX );
        const y = Math.abs( rect.y - event.clientY );

        // half dimensions of the ticket
        const halfWidth = rect.width / 2;
        const halfHeight = rect.height / 2;

        // angles to distort the ticket
        const angleX = ( x - halfWidth ) / distortX;
        const angleY = ( y - halfHeight ) / distortY;

        // new shadows relative to cursor
        const xShadow = ( x - halfWidth ) / 3;
        const yShadow = ( y - halfHeight ) / 3;

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

    // PointerEvent or TapEvent
    useEffect( () => {
        const target = ref.current as HTMLDivElement;

        target.addEventListener( 'pointerenter', make3D );
        // target.addEventListener( 'pointermove', make3D );
        target.addEventListener( 'pointerleave', reset );

        // load initial styles on component render
        // reset();
        initParentStyles( target );
        return () => {
            target.removeEventListener( 'pointerenter', make3D );
            target.removeEventListener( 'pointerleave', reset );
        }
    }, [] );

    // useEffect( () => {
    //     const target = ref.current as HTMLElement;

    //     initParentStyles( target );
    //     target.addEventListener( 'pointerenter', make3D );
    // }, [] );


    // the default pointerMove does not work in Firefox - using more complete one
    // TapEvent
    // usePointerMove( ref, make3D );

    return (
        <section id={id} className='ticket-container' style={parentStyles}
            // React import PointerEvent
            onPointerEnter={make3D} onPointerLeave={reset}>
            <div ref={ref} className={ticketClasses} style={styles} >{children}</div>
        </section>
    )
}

export default Ticket;