// types
import { FC } from 'react';
// import { Colors } from 'types';

/* TYPES */
interface Props {
    className?: string;
    color?: 'brand-blue' | 'green' | 'blue' | 'yellow' | 'orange' | 'purple' | 'pink';
}

/**
 * Cool text highlight effect.
 * Children rendered to allow user to alter text type.
 * For example, different kinds of headers (h1 or h2).
 */
const TextHighlight: FC<Props> = ( {
    children,
    className,
    color='blue',
} ) => {

    const textHighlightClasses = `
        text-highlight
        ${className}
        ${color}
    `;

    return (
        <span className={textHighlightClasses}>{children}</span>
    )
}

export default TextHighlight;