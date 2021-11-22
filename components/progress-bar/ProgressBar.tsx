// dependencies
import { useState, useEffect } from 'react';
import { useThrottledCallback } from 'use-debounce';
// utils
import calcPagePosition from './calcPagePosition';

/* TYPES */
interface Styles {
    progressColor?: string;
    backgroundColor?: string;
    height?: number;
}

interface Props {
    className?: string;
    styles: Styles;
}

/**
 * Tracks the scroll position of the page via a progress bar.
 * Useful for blog pages.
 */
const ProgressBar = ( { 
    className='',
    styles: {
        progressColor='blue',
        backgroundColor='red',
        height=6,
    },
}: Props ) => {

    /* HOOKS */
    const [ progress, setProgress ] = useState<number>( 0 );

    /* FUNCTIONS */
    const handleScroll = useThrottledCallback( 
        () => setProgress( calcPagePosition() ),
        15
    );

    /* CLASSNAMES */
    const containerClasses = `
        progress-bar-container 
        ${className}
    `

    /* STYLES */
    const wrapperStyles = {
        background: `linear-gradient( to right, ${progressColor} ${progress}%, ${backgroundColor} 0% )`,
        height: `${height}px`,
    }

    useEffect( () => {
        document.addEventListener( 'scroll', handleScroll );
        return () => {
            document.removeEventListener( 'scroll', handleScroll );
        }
    }, [ progress ] );

    return (
        <section className={containerClasses}>
            <div className='progress-bar-wrapper' style={wrapperStyles} />
        </section>
    );
}

export default ProgressBar;