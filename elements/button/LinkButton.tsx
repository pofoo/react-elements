// dependencies
import Link from 'next/link';
// types
import { Href } from 'types';

/* TYPES */
interface Content {
    text: string;
}

interface Props {
    className?: string;
    content: Content;
    href: Href;
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
}: Props ) => {

    /* CLASSNAMES */
    const linkButtonClasses = `
        link-button-wrapper
        ${className}
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