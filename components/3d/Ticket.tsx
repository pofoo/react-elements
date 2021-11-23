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

        target.addEventListener( 'mouseeenter', calcAngle );
        target.addEventListener( 'mousemove', calcAngle );
        target.addEventListener( 'mouseleave', () => {} );
        return () => {
            target.removeEventListener( 'mouseenter', calcAngle );
            target.removeEventListener( 'mousemove', calcAngle );
            target.removeEventListener( 'mouseleave', () => {} );
        }
    }, [] );

    return (
        <section id={id} ref={ref} className={ticketClasses}>{children}</section>
    )
}

export default Ticket;