
/* TYPES */
interface Content {
    text: string;
}

interface TagProps {
    className?: string;
    content: Content;
}

const Tag = ( {
    className,
    content: {
        text
    }
}: TagProps ) => {

    const tagClasses = `
        tag-wrapper
        ${className}
    `;
    return (
        <div className={tagClasses}>
            <span className='tag-text'>{text}</span>
        </div>
    )
}

export default Tag;