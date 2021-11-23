// dependencies
import { FC, useEffect, useRef } from 'react';

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

    /* HOOKS */
    const ref = useRef<HTMLElement>( null );

    /* FUNCTIONS */
    const calcAngle = (): void => {

    }

    const ticketClasses = `
        ticket-wrapper
        ${className}
        ${moveColor ? 'move-color' : ''}
        ${animate ? 'animate' : ''}
    `;


    useEffect( () => {
        const target = ref.current as HTMLElement;

        target.addEventListener( 'pointerenter', calcAngle );
        target.addEventListener( 'pointermove', calcAngle );
        target.addEventListener( 'pointerleave', () => {} );
        return () => {
            target.removeEventListener( 'pointerenter', calcAngle );
            target.removeEventListener( 'pointermove', calcAngle );
            target.removeEventListener( 'pointerleave', () => {} );
        }
    }, [] );

    return (
        <section id={id} ref={ref} className={ticketClasses}>{children}</section>
    )
}

export default Ticket;