// types
import { Colors } from 'types';

/* TYPES */
interface Content {
    text: string;
}

interface Props {
    Tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    className?: string;
    content: Content;
    color?: 'brand-blue' | 'green' | 'blue' | 'yellow' | 'orange' | 'purple' | 'pink';
    gradient?: boolean;
    link?: boolean;
}

/**
 * Heading Text. 
 */
const Heading = ( {
    Tag='h2',
    className='',
    content,
    color='blue',
    gradient=true,
    link=true,
}: Props ) => {

    /* CONTENT */
    const { text } = content;

    /* CLASSNAMES */
    const headingClasses = `
        heading
        ${color}
        ${gradient ? 'gradient' : ''}
        ${link ? 'link' : ''}
        ${className}
    `;
    return (
        <Tag className={headingClasses}>
            {text}
        </Tag>
    )
}

export default Heading;