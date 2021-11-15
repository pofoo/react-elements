// depdendencies
import Link from 'next/link';
// types
import { Href } from 'types';
// elements
import SVG from '../svg';


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
    type?: 'main-header' | 'sub-header' | 'footer';
}

/**
 * Navigation links that redirect to another part of the website (internal).
 * If you want to have a sub navigation pop-up, use the ToggleButton component.
 */
const NavLink = ( {
    className,
    content,
    href,
    type,
}: Props ) => {

    const { text, icon=null } = content;

    const navLinkClasses = `
        nav-link-wrapper
        ${className}
        ${type}
    `;
    return (
        <Link href={href}>
        <a>
            <div className={navLinkClasses}>
                {
                    icon && (
                        // TO-DO - adjust width and height depending on button size
                        // use a dummy icon to see how it would look
                        <SVG data={icon.data} alt={icon.alt}
                            width={50} height={50} />
                    )
                }
                <span className='nav-link-text'>{text}</span>
            </div>
        </a>
        </Link>
    )
}

export default NavLink;