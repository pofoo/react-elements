// dependencies
import { FC, useEffect, useRef, useState, PointerEvent } from 'react';
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
    moveColor?: boolean; // whether the background color should be continuously changing and blending
    animate?: boolean; // whether to continuously animate the ticket
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
    moveColor=true,
    animate=false,
} ) => {

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
        event: ReactTapEvent | TapEvent | PointerEvent,
        distortX: number=6,
        distortY: number=4,
    ): void => {
        const target = ref.current as HTMLElement;
        const rect = target.getBoundingClientRect();

        // TO-DO - take into account for both MouseEvent and TouchEvent
        if ( event.nativeEvent instanceof TouchEvent ) {

        }
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

        const dropShadowColor = `rgba(0, 0, 0, 0.3)`;

        setStyles( {
            transform: `rotateY(${angleX}deg) rotateX(${angleY}deg) scale(1.15)`,
            perspective: `${halfWidth * 3}px`,
            filter: `drop-shadow(${-xShadow}px ${yShadow}px 15px ${dropShadowColor})`,
        } );
    }

    const reset = () => {
        const dropShadowColor = `rgba(0, 0, 0, 0.3)`;

        setStyles( {
            transform: `rotateY(0deg) rotateX(0deg) scale(1)`,
            filter: `drop-shadow(0 10px 15px ${dropShadowColor})`,
        } );
    }

    const initParentStyles = ( target: HTMLElement ) => {
        const halfWidth = target.getBoundingClientRect().width / 2;
        
        setParentStyles( {
            perspective: `${halfWidth * 2}px`,
        } );
    }

    /* CLASSNAMES */
    const ticketClasses = `
        ticket-wrapper
        ${className}
        ${moveColor ? 'move-color' : ''}
        ${animate ? 'animate' : ''}
    `;

    useEffect( () => {
        const target = ref.current as HTMLDivElement;

        target.addEventListener( 'pointerenter', make3D );
        target.addEventListener( 'pointerleave', reset );

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
    usePointerMove( ref, make3D );

    return (
        <section id={id} ref={ref} className='ticket-container' style={parentStyles}
            onPointerEnter={make3D} onPointerLeave={reset}>
            <div style={styles} className={ticketClasses}>{children}</div>
        </section>
    )
}

export default Ticket;