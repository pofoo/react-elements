// dependencies
import { useState, useEffect } from 'react';
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

const ProgressBar = ( { 
    className,
    styles: {
        progressColor='blue',
        backgroundColor='red',
        height=6,
    },
}: Props ) => {

    /* HOOKS */
    const [ progress, setProgress ] = useState<number>( 0 );

    /* FUNCTIONS */
    const handleScroll = ( () => {
        setProgress( calcPagePosition() );
    } );

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
        <div className={containerClasses}>
            <div className='progress-bar-wrapper' style={wrapperStyles} />
        </div>
    );
}

export default ProgressBar;