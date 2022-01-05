
/**
 * Returns the width and height of a target in an array.
 */
const getTargetSize = <T extends HTMLElement>( target: T ) => {
    return [ target.offsetWidth, target.offsetHeight ];
}

export default getTargetSize;