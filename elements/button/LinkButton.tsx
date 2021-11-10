// dependencies
import Link from 'next/link';
// types
import { Href } from 'types';

/* TYPES */
interface Content {
    text: string;
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
 * Link Buttons redirect to another part of the website (internal)
 */
const LinkButton = ( {
    className,
    content: {
        text,
    },
    href,
    type,
}: Props ) => {

    // INCLUDE THE ARROW BY DEFAULT - DO NOT ALLOW FOR CUSTOMIZATION OF THAT
    
    /* CLASSNAMES */
    const linkButtonClasses = `
        link-button-wrapper
        ${className}
        ${type}
    `;

    return (
        <Link href={href}> 
            <a className={linkButtonClasses}>
                {text}
            </a>
        </Link>
    );
}

export default LinkButton;