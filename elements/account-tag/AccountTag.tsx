// dependencies
import Image from 'next/image';
// types
import { ObjectAtLeastOne } from 'types';

/* TYPES */
type Image = {
    src: string;
    alt: string;
}

// EITHER an image or name needs to be specified
type Content = ObjectAtLeastOne<{
    name: string;
    image: Image;
}>;

interface Props {
    className?: string;
    content: Content;
    firstElem?: 'name' | 'image';
}

/**
 * Account Tag identifier.
 * Can be wrapped in a ToggleButton to enable navigation via a popup
 */
const AccountTag = ( {
    className,
    content,
    firstElem='image',
}: Props ) => {

    const { name=null, image=null } = content;

    const accountClasses = `
        account-tag-wrapper
        ${className}
        ${firstElem}-first
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