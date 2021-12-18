/**
 * Creates an object by using an arrays values as keys and mapping them onto a given value.
 */
const mapArrayToObject = (
    list: ( string | number )[],
    value: any,
) => {
    return Object.fromEntries( list.map( key => [ key, value ] ) )
}

export default mapArrayToObject;