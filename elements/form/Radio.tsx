
/* TYPES */
interface Props {
    className?: string;
}

/**
 * Radio toggle. 
 */
const Radio = ( {
    className='',
}: Props ) => {

    const radioClasses = `
        radio
        ${className}
    `;

    return (
        <input className={radioClasses} type='radio' />
    )
}

export default Radio;