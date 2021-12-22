
/* TYPES */
interface Props {
    className?: string;
}

/**
 * Search input.
 */
const Search = ( {
    className=''
}: Props ) => {

    const searchClasses = `
        search
        ${className}
    `;

    return (
        <input className={searchClasses} type='search'/>
    )
}

export default Search;