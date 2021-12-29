
/* TYPES */
interface Content {
    label: string;
    value: string;
}

interface Props {
    className?: string;
    content: Content;
}

/**
 * Radio toggle. 
 */
const Radio = ( {
    className='',
    content,
}: Props ) => {

    /* CONTENT */
    const { label, value } = content;

    /* CLASSNAMES */
    const radioWrapperClasses = `
        radio-wrapper
        ${className}
    `

    const radioClasses = `
        radio
    `;

    return (
        <div className={radioWrapperClasses}>
            <label htmlFor={value}>{label}</label>
            <input className={radioClasses} type='radio' value={value}/>
        </div>
    )
}

export default Radio;