// elements
import SVG from '../svg';
import XClose from '../x-close';
// types
import type { Colors, VoidFn } from 'types';

/* TYPES */
interface Close {
    onClick: VoidFn;
}

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
    close?: Close;
    // styling
    color?: 'brand-blue' | 'green' | 'blue' | 'yellow' | 'orange' | 'purple' | 'pink';
    isRounded?: boolean;
    type?: 'retro' | 'glass';
}

/**
 * Tag to categorize a piece of content
 */
const Tag = ( {
    className='',
    content,
    close,
    color='green',
    isRounded=true,
    type='retro',
}: Props ) => {
    /* CONTENT */
    const { text, icon=null } = content;

    /* CLASSNAMES */
    const tagClasses = `
        tag
        ${className}
        ${color}
        ${isRounded ? 'rounded' : ''}
        ${type ? type : ''}
        ${close ? 'has-close' : ''}
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
            {
                close !== undefined && (
                    <XClose onClick={close.onClick} ariaLabel={`delete ${text} tag`}
                        shape='circle' showBackground={true} />
                )
            }
        </div>
    )
}

export default Tag;