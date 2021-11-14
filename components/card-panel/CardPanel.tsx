// types
import { FC } from 'react';

/* TYPES */
interface Props {
    // customization
    id?: string;
    className?: string;
    // styling
    isCentered: boolean;
}

const CardPanel: FC<Props> = ( {
    children,
    id,
    className,
    isCentered,
} ) => {

    const cardPanelClasses = `
        ${isCentered ? 'centerd-card-panel' : 'card-panel'}
        ${className}
    `;

    return (
        <section id={id} className={cardPanelClasses}>
            {children}
        </section>
    )
}

export default CardPanel;