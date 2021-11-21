// depdendencies
import Link from 'next/link';
// types
import { Href, ConditionalProps } from 'types';
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

/* USE THIS TYPING IN PRODUCTION - DOSEN'T WORK IN STORYBOOK */
// this dosen't work lmao
// type Props = ConditionalProps<
//     {
//         // customization
//         className?: string;
//         content: Content;
//         href: Href;
//         // styling
//         type?: 'main-header' | 'sub-header' | 'footer';
//         isActive?: boolean | undefined;
//         // TO-DO - different animation types should be available for different types
//         animation?: 'drop';
//     },
//         'type',
//     {
//         // if type is main-header, isActive must be specified as a boolean
//         // TO-DO - i want this to be stricter
//         type: 'main-header';
//         isActive: boolean;
//     }
// >

interface Props {
    // customization
    className?: string;
    content: Content;
    href: Href;
    // styling
    type?: 'main-header' | 'sub-header' | 'footer';
    // TO-DO - only have this prop available when type is main-header
    isActive?: boolean;
    // TO-DO - different animation types should be available for different types
    animation?: 'drop';
}

/**
 * Navigation links that redirect to another part of the website (internal).
 * If you want to have a sub navigation pop-up, use the ToggleButton component.
 */
const NavLink = ( {
    className,
    content,
    href='/',
    type='footer',
}: Props ) => {

    const { text, icon=null } = content;
    // let active;
    // if ( typeof isActive === 'boolean' ) {
    //     active = isActive === true ? 'active' : '';
    // }
    // else if ( isActive === undefined ) {
    //     active = '';
    // } 
    // else {
    //     throw( 'Incorrect prop type for isActive' )
    // }

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