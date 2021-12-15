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
 * Card Panel - collection of card elements.
 */
const CardPanel: FC<Props> = ( {
    children,
    id,
    className='',
    isCentered=true,
} ) => {

    const cardPanelClasses = `
        ${className}
        ${isCentered ? 'centered-card-panel' : 'card-panel'}
    `;

    return (
        <section id={id} className={cardPanelClasses}>
            {children}
        </section>
    )
}

export default CardPanel;