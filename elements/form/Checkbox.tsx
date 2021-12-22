
/* TYPES */
interface Props {
    className?: string;
    isSwitch?: boolean; // whether the checkbox is a toggle switch - maybe I can do this with classNames instead?
}

/**
 * Toggle checkbox.
 */
const Checkbox = ( {
    className='',
    isSwitch=false,
}: Props ) => {

    const checkboxClasses = `
        checkbox
        ${isSwitch ? 'switch' : ''}
        ${className}
    `;
    return (
        <input className={checkboxClasses} type='checkbox' />
    )
}

export default Checkbox;