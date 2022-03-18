// dependencies
import { useState, useMemo } from 'react';
import { useRouter } from 'next/router';
// utils
import { getHalfs, calcStartNum } from './utils';
// types
import type { Href } from 'types';


/* UTIL FUNCTIONS */
/* TYPES */
export interface Props {
    className?: string;
    totalItems: number; // total amount of items to paginate
    baseHref: Href; // base Href to use
    itemsPerPage?: number;
    numPages?: number; // number of pagination pages to show at a time
    activePage?: number; // current page we are on
}

/**
 * Pagination
 */
const Pagination = ( {
    className='',
    totalItems,
    baseHref,
    itemsPerPage=10,
    numPages=5,
    activePage=6,
}: Props ) => {
    const totalPages = useMemo( () => totalItems / itemsPerPage, [] );
    const [ leftHalf, rightHalf ] = useMemo( () => getHalfs( numPages ), [] );

    /* HOOKS */
    const router = useRouter();
    const [ startNum, setStartNum ] = useState<number>(
        calcStartNum( activePage, leftHalf ) );

    /* FUNCTIONS */
    const onNumClick = ( pageNum: number ) => {
        router.push( `${baseHref}/${pageNum}` );
    }

    /* CLASSNAMES */
    const paginationClasses = `
        pagination
        ${className}
    `;

    return (
        <div className={paginationClasses}>
            {
                // Dots should have an onClick that shows more pages
                startNum > 1  && (
                    // amount to go UP:
                    // numPages + whatever amount of elements are NOT on the left side
                    // numPages + leftHalf;
                    <>
                        <button className='number'>
                            1
                        </button>
                        <div>Dots</div>
                    </>
                )
            }
            {
                 [ ...Array( numPages ) ].map( ( _, index ) => {
                        const num = startNum + index;
                        
                        const linkClasses = `
                            number
                            ${activePage === num ? 'active' : ''}
                        `;

                        return (
                            <button className={linkClasses}>
                                {startNum + index}
                            </button>
                        )
                    } )
            }
            {
                // Dots should have an onClick that shows more pages
                startNum + numPages < totalPages && (
                    // amount to do DOWN
                    // numPages + whatever amount of elements are NOT on the right side
                    // numPages + rightHalf;
                    <div>Dots</div>
                )
            }
        </div>
    )
}

export default Pagination;