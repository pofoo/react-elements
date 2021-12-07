// returns the half width and half height for a given target bounding rectangle
const getHalfSizes = ( rect: DOMRect ) => {
    return [ rect.width / 2, rect.height / 2 ]; 
}

export default getHalfSizes;