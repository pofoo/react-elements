// dependencies
import Link from 'next/link';
// types
import { Href } from 'types';
// partials
import SVG from '../svg';
import { Arrow } from '../icon';

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
    href: Href;
    // styling
    // TO-DO - implement header + footer links styles
    type?: 'CTA' | 'header' | 'footer';
}

/**
 * Link Buttons redirect to another part of the website (internal).
 */
const LinkButton = ( {
    className,
    content,
    href,
    type,
}: Props ) => {

    const { text, icon=null } = content;
    // INCLUDE THE ARROW BY DEFAULT - DO NOT ALLOW FOR CUSTOMIZATION OF THAT

    // header - include the light background option with a chevron -> arrow animation
    // footer - regular highlight link - draw the underline
    // CTA - scale + color 
    
    /* CLASSNAMES */
    const linkButtonClasses = `
        link-button-wrapper
        ${className}
        ${type}
    `;

    return (
        <Link href={href}> 
            <a className={linkButtonClasses}>
            {
                icon && (
                    // TO-DO - adjust width and height depending on button size
                    // use a dummy icon to see how it would look
                    <SVG data={icon.data} alt={icon.alt}
                        width={50} height={50} />
                )
            }
                {text}
            </a>
        </Link>
    );
}

export default LinkButton;