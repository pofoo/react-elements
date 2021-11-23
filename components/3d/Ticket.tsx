// dependencies
import { FC, useEffect, useRef, useState } from 'react';

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
 * 3D ticket that follows mouse cursor on hover.
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
        event: PointerEvent,
        distortX: number=6,
        distortY: number=4,
    ): void => {
        const target = ref.current as HTMLElement;
        const rect = target.getBoundingClientRect();

        // position of user mouse relative to ticket
        const x = Math.abs( rect.y - event.clientY );
        const y = Math.abs( rect.x - event.clientX );

        // half dimensions of the ticket
        const halfWidth = rect.width / 2;
        const halfHeight = rect.height / 2;

        // angles to distort the ticket
        const angleX = ( x - halfWidth ) / distortX;
        const angleY = ( y - halfHeight ) / distortY;

        // new shadows relative to cursor
        const xShadow = ( x - halfWidth ) / 3;
        const yShadow = ( y - halfHeight ) / 3;

        let dropShadowColor = `rgba(0, 0, 0, 0.3)`

        // parent.style.perspective = `${halfWidth * 2}px`

        // styles
        const itemStyles = {
            transform: `rotateY(${angleX}deg) rotateX(${angleY}deg) scale(1.15)`,
            perspective: `${halfWidth * 3}px`,
            filter: `drop-shadow(${-xShadow}px ${yShadow}px 15px ${dropShadowColor})`,
        }

        setStyles( itemStyles );
    }

    const reset = ( event: PointerEvent ) => {
        let dropShadowColor = `rgba(0, 0, 0, 0.3)`

        const itemStyles = {
            transform: `rotateY(0deg) rotateX(0deg) scale(1)`,
            filter: `drop-shadow(0 10px 15px ${dropShadowColor})`,
        }

        setStyles( itemStyles );
    }

    const initiateStyles = ( target: HTMLElement ) => {
        const halfWidth = target.getBoundingClientRect().width / 2;
        
        const styles = {
            perspective: `${halfWidth * 2}px`,
        }

        setParentStyles( styles );
    }

    /* CLASSNAMES */
    const ticketClasses = `
        ticket-wrapper
        ${className}
        ${moveColor ? 'move-color' : ''}
        ${animate ? 'animate' : ''}
    `;

    useEffect( () => {
        const target = ref.current as HTMLElement;

        target.addEventListener( 'pointerenter', make3D );
        target.addEventListener( 'pointermove', make3D );
        target.addEventListener( 'pointerleave', reset );

        initiateStyles( target );
        return () => {
            target.removeEventListener( 'pointerenter', make3D );
            target.removeEventListener( 'pointermove', make3D );
            target.removeEventListener( 'pointerleave', reset );
        }
    }, [] );

    return (
        <section id={id} ref={ref} className={ticketClasses} style={parentStyles}>
            <div style={styles}>{children}</div>
        </section>
    )
}

export default Ticket;