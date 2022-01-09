// dependencies
import { nanoid } from 'nanoid';
// types
import { ReactNode } from 'react';

/* TYPES */
interface Content {
    items: ReactNode[];
}

interface Props {
    id: string;
    className?: string;
    content: Content;
    itemClassName?: string;
}

/**
 * List Compontent.
 */
const List = ( {
    id,
    className='',
    content,
    itemClassName,
}: Props ) => {
    
    /* CONTENT */
    const { items } = content;

    /* CLASSNAMES */
    const listClasses = `
        list
        ${className}
    `;

    const itemClasses = `
        item
        ${itemClassName} 
    `;

    return (
        <ul id={id} className={listClasses}>
            {
                // items.map( ( item ) => {
                //     <li key={nanoid(5)} className={itemClasses}>{item}</li>
                // } )
                <>
                <li className={itemClasses}>Hello</li>
                <li className={itemClasses}>Hello</li>
                </>
            }
        </ul>
    )
}

export default List;