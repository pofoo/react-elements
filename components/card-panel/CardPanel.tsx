// types
import { FC } from 'react';

/* TYPES */
interface Props {
    // customization
    id?: string;
    className?: string;
    // styling
    isCentered?: boolean;
}

/**
 * Card Panel.
 */
const CardPanel: FC<Props> = ( {
    children,
    id,
    className,
    isCentered=true,
} ) => {

    const cardPanelClasses = `
        ${isCentered ? 'centered-card-panel' : 'card-panel'}
        ${className}
    `;

    return (
        <section id={id} className={cardPanelClasses}>
            {children}
        </section>
    )
}

export default CardPanel;