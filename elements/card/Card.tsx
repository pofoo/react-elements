// types
import { FC } from 'react';
// import { Colors } from 'types';

/* TYPES */
interface Props {
    // customization
    id?: string;
    className?: string;
    // styling
    color?: 'brand-blue' | 'green' | 'blue' | 'yellow' | 'orange' | 'purple' | 'pink' | 'gray';
    isRounded?: boolean;
}

const Card: FC<Props> = ( {
    children,
    id,
    className,
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
        <div id={id} className={cardClasses}>{children}</div>
    )
}

export default Card;