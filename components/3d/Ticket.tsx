// dependencies
import { FC } from 'react';

/* TYPES */
interface Props {
    // customization
    id?: string;
    className?: string;
}

const Ticket: FC<Props> = ( {
    children,
    id,
    className,
} ) => {

    const ticketClasses = `
        ticket-wrapper
        ${className}
    `;

    return (
        <section id={id} className={ticketClasses}>{children}</section>
    )
}

export default Ticket;