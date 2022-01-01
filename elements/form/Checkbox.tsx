
/* TYPES */
interface Content {
    label: string;
}

interface Props {
    // customization
    id: string;
    className?: string;
    content: Content;
    // states
    checked?: boolean;
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
    checked=false,
    labelPosition='left',
    isSwitch=false,
}: Props ) => {

    /* CONTENT */
    const { label } = content;

    /* CLASSNAMES */
    const checkboxWrapperClasses = `
        input-wrapper
        checkbox-wrapper
        ${labelPosition}
    `;

    const checkboxClasses = `
        input
        checkbox
        ${isSwitch ? 'switch' : ''}
        ${className}
    `;

    return (
        <div className={checkboxWrapperClasses}>
            <label className='label checkbox-label' htmlFor={id}>{label}</label>
            <input id={id} className={checkboxClasses} type='checkbox'
                checked={checked} />
        </div>
    )
}

export default Checkbox;