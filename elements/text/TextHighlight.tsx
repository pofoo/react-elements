
/* TYPES */
interface Content {
    text: string;
}

interface Props {
    className?: string;
    content: Content;
    color?: 'brand-blue' | 'green' | 'blue' | 'yellow' | 'orange' | 'purple' | 'pink';
}

const TextHighlght = ( {
    className,
    content: {
        text,
    },
    color,
}: Props ) => {

    const textHighlightClasses = `
        text-highlight
        ${className}
        ${color}
    `;

    return (
        <span className={textHighlightClasses}>{text}</span>
    )
}

export default TextHighlght;