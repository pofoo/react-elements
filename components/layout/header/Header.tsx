// dependencies
import { FC, useState, useEffect } from 'react';
import { useThrottledCallback } from 'use-debounce';

/* TYPES */
interface Props {
    id: string;
    className?: string;
}

/**
 * Header that hides on scroll down and shows on scroll up.
 */
const Header: FC<Props> = ( {
    children,
    id,
    className='',
} ) => {
    
    /* HOOKS */
    const [ scrollPos, setScrollPos ] = useState<number>( 0 );
    const [ scrollDirection, setScrollDirection ] = useState<'up' | 'down' | null>( null );

    /* FUNCTIONS */
    const handleScroll = ( prevScrollPos: number ): void => {
        const currScrollPos = window.scrollY;
        const scrollDirection = currScrollPos >= prevScrollPos ? 'down' : 'up';
        
        setScrollPos( currScrollPos );
        setScrollDirection( scrollDirection );
    }

    const throttleScroll = useThrottledCallback( 
        () => handleScroll( scrollPos ), 
        250,
    );

    /* CLASSNAMES */
    const headerClasses = `
        header-wrapper
        ${className}
        ${scrollDirection === 'down' ? 'hide' : ''}
    `;

    useEffect( () => {
        document.addEventListener( 'scroll', throttleScroll );
        return () => {
            document.removeEventListener( 'scroll', throttleScroll );
        }
    }, [ scrollPos ] );

    return (
        <header id={id} className={headerClasses}>
            {children}
        </header>
    )
}

export default Header;