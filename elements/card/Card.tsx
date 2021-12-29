// types
import { FC } from 'react';
// import { Colors } from 'types';

/* TYPES */
interface Props {
    // customization
    className?: string;
    // styling
    color?: 'brand-blue' | 'green' | 'blue' | 'yellow' | 'orange' | 'purple' | 'pink' | 'shadow';
    isRounded?: boolean;
}

/**
 * Individual card able with different style box shadows.
 * Renders any children passed into card.
 */
const Card: FC<Props> = ( {
    children,
    className='',
    color='blue',
    isRounded=true,
} ) => {

    const cardClasses = `
        card-wrapper
        ${className}
        ${color}
        ${isRounded ? 'rounded' : ''}
    `;

    return (
        <div className={cardClasses}>{children}</div>
    )
}

export default Card;