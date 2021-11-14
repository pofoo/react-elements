// dependencies
import Image from 'next/image';

/* TYPES */
// EITHER an image or name needs to be specified
interface Content {
    image?: {
        src: string;
        alt: string;
    },
    name: string;
}

interface Props {
    className?: string;
    content: Content;
}

/**
 * Account Tag identifier.
 * Can be wrapped in a ToggleButton to enable navigation via a popup
 */
const AccountTag = ( {
    className,
    content,
    image,
}: Props ) => {
    
    const { image=null, name=null } = content;

    const accountClasses = `
        account-tag-wrapper
        ${className}
    `;
    
    return (
        <div className={accountClasses}>
            <Image src={image?.src} alt={image?.alt}
                className='account-image'
                width='35' height='35' />
            <span className='account-name'>
                {name}
            </span>
        </div>
    )
}

export default AccountTag;