// partials
import SVG from '../svg';
// types
// import { Colors } from 'types';

/* TYPES */
interface Content {
    text: string;
    icon?: {
        data: string;
        alt: string;
    }
}

interface Props {
    // customization
    className?: string;
    content: Content;
    // styling
    color?: 'brand-blue' | 'green' | 'blue' | 'yellow' | 'orange' | 'purple' | 'pink';
    isRounded?: boolean;
}

const Tag = ( {
    className,
    content,
    color='green',
    isRounded=true,
}: Props ) => {

    const { text, icon=null } = content;

    const tagClasses = `
        tag-wrapper
        ${className}
        ${color}
        ${isRounded ? 'rounded' : ''}
    `;

    // TO-DO - implement icon
    return (
        <div className={tagClasses}>
            {
                icon && (
                    // TO-DO - adjust width and height depending on button size
                    // use a dummy icon to see how it would look
                    <SVG data={icon.data} alt={icon.alt}
                        width={50} height={50} />
                )
            }
            <span className='tag-text'>{text}</span>
        </div>
    )
}

export default Tag;