
/* TYPES */
interface Props {
    id: string;
    className?: string;
}

/**
 * Select input.
 */
const Select = ( {
    id,
    className='',
}: Props ) => {

    const selectClasses = `
        select
        ${className}
    `;

    return (
        <select className={selectClasses} name='some-name' id={id}></select>
    )
}

export default Select;