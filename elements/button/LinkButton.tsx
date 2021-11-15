// dependencies
import Link from 'next/link';
// types
import { Href } from 'types';
// import { BackgroundColors } from 'types';
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

// TO-DO - sticky should only work when isRounded = false
// TO-DO - create an :focus after click effect
interface Props {
    // customization
    className?: string;
    content: Content;
    href: Href;
    // styling
    type?: 'CTA' | 'sticky';
    size?: 'sm' | 'md' | 'lg';
    color?: 'ghost-white' | 'antique-white' | 'mint-cream' | 'alice-blue';
    isRounded?: boolean;
}

/**
 * Link Buttons redirect to another part of the website (internal).
 * Looks like a button.
 */
const LinkButton = ( {
    className,
    content,
    href,
    type='CTA',
    size='md',
    color='ghost-white',
    isRounded=true,
}: Props ) => {


    const { text, icon=null } = content;
    
    /* CLASSNAMES */
    const linkButtonClasses = `
        button-wrapper
        link-button-wrapper
        ${className}
        ${type}
        button--${size}
        ${color}
        ${isRounded ? 'rounded' : ''}
    `;

    return (
        <Link href={href}> 
        <a>
            <div className={linkButtonClasses}>
                {
                    icon && (
                        // TO-DO - adjust width and height depending on button size
                        // use a dummy icon to see how it would look
                        <SVG data={icon.data} alt={icon.alt}
                            width={50} height={50} />
                    )
                }
                <div className='link-button-text'>
                    {text}
                    {
                        type === 'CTA' && (
                            <div className='arrow'>➤</div>
                        )
                    }
                </div>
            </div>
        </a>
        </Link>
    );
}

export default LinkButton;