// dependencies
import { FC } from 'react';

/* TYPES */
interface Content {
    legend: string;
}

interface Props {
    // customization
    id: string;
    className?: string;
    content: Content;
    name: string;
}

/**
 * FieldSet to group form elements.
 */
const FieldSet: FC<Props> = ( {
    children,
    id,
    className='',
    content,
    name,
} ) => {

    /* CONTENT */
    const { legend } = content;

    /* CLASSNAMES */
    const fieldsetClasses = `
        fieldset-wrapper
        ${className}
    `;

    return (
        <fieldset id={id} className={fieldsetClasses} name={name}>
            <legend>{legend}</legend>
            {children}
        </fieldset>
    )
}

export default FieldSet;