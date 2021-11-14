// dependencies
import Image from 'next/image';

/* TYPES */
type Image = {
    src: string;
    alt: string;
}

// EITHER an image or name needs to be specified
// type Content = {
//     ['image']: Image;
//     image: Image;
// }

interface Content {
    name?: string;
    image?: Image;
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
    name,
    image,
}: Props ) => {
    
    const { image=null, name=null } = content;

    const accountClasses = `
        account-tag-wrapper
        ${className}
    `;
    
    return (
        <div className={accountClasses}>
            <Image src={image?.src as string} alt={image?.alt as string}
                className='account-image'
                width='35' height='35' />
            <span className='account-name'>
                {name}
            </span>
        </div>
    )
}

export default AccountTag;