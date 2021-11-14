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
 * ERROR - for some reason storybook doesn't refresh when the 'isCentered' prop is toggled.
 * To see both styles, you have to manually change the code
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