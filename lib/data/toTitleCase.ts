/**
 * Converts a string to title case (first letter capitilized)
 */
const toTitleCase = ( value: string ) => {
    return value.charAt( 0 ).toUpperCase() + value.slice( 1 );
}

export default toTitleCase;