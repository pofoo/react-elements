export const calcStartNum = (
    pageStart: number,
    leftHalf: number,
) => {
    const startNum = pageStart - leftHalf;

    if ( startNum <= 0 )
        return 1;
    
    return startNum;
}

export const getHalfs = ( numPages: number ) => {
    // subtract one to include the current activePage
    const halfNumPages = ( numPages - 1 ) / 2;
    const leftHalf = Math.floor( halfNumPages );
    const rightHalf = Math.ceil( halfNumPages );

    return [ leftHalf, rightHalf ];
}
