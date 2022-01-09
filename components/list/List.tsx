// installed hooks
import { useInView } from 'react-intersection-observer';
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

    return (
        <ul id={id} className={listClasses}>
            {
                items.map( ( item, index ) => {
                    const { ref, inView } = useInView( { 
                        threshold: 0.95,
                    } );

                    const itemClasses = `
                        item
                        ${inView ? 'in-view' : 'not-in-view'}
                        ${itemClassName}
                    `;

                    return (
                        <li key={index} ref={ref} className={itemClasses}>
                            {item}
                        </li>
                    )
                } )
            }
        </ul>
    )
}

export default List;