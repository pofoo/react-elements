// types
import { FC } from 'react';

/* TYPES */
interface Props {
    className?: string;
}

const Card: FC<Props> = ( {
    children,
    className,
} ) => {

    const cardClasses = `
        card-wrapper
        ${className}
    `;

    return (
        <div className={cardClasses}>{children}</div>
    )
}

export default Card;