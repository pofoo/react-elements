
/* TYPES */
interface Content {
    label: string;
}

interface Props {
    // customization
    id: string;
    className?: string;
    content: Content;
    // styling
    labelPosition?: 'right' | 'left' | 'above';
    isSwitch?: boolean; // whether the checkbox is a toggle switch - maybe I can do this with classNames instead?
}


/**
 * Toggle checkbox.
 */
const Checkbox = ( {
    id,
    className='',
    content,
    labelPosition='left',
    isSwitch=false,
}: Props ) => {

    /* CONTENT */
    const { label } = content;

    /* CLASSNAMES */
    const checkboxWrapperClasses = `
        checkbox-wrapper
        ${labelPosition}
    `;

    const checkboxClasses = `
        checkbox
        ${isSwitch ? 'switch' : ''}
        ${className}
    `;

    return (
        <div className={checkboxWrapperClasses}>
            <label className='lable' htmlFor={id}>{label}</label>
            <input id={id} className={checkboxClasses} type='checkbox' />
        </div>
    )
}

export default Checkbox;