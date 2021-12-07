// types
import { Distort, Scale, Displace } from './types';
// lib
import { getHalfSizes } from '../../../lib';


// returns keyframes ticket animation
const getTicketAnimation = (
    target: HTMLElement,
    shadowColor: string,
    animationDuration: number=3, // number in seconds it will take the ticket to make one full circular rotation
    distort: Distort={},
): string => {

    const rect = target.getBoundingClientRect();

    /* CONTENT */
    const {
        xDistort=18,
        yDistort=12,
        shadowDistort=9,
    } = distort;

    // half dimensions of the ticket
    const [ halfWidth, halfHeight ] = getHalfSizes( rect );
    // getting animation depth
    const { center, animate } = calcAnimations( target );
    const [ xCenter, yCenter ] = center;
    const [ xAnimate, yAnimate ] = animate;

    const getAngle = ( 
        type: 'angle' | 'shadow',
        displace: Displace={}
    ): number[] => {
        /* CONTENT */
        const { xDisplace=0, yDisplace=0 } = displace;

        if ( type === 'angle' ) return [
            ( xCenter + xDisplace - halfWidth ) / xDistort,
            ( yCenter + yDisplace - halfHeight) / yDistort,
        ]
        else if ( type === 'shadow' ) return [
            ( xCenter + xDisplace - halfWidth ) / shadowDistort,
            ( yCenter + yDisplace - halfHeight ) / shadowDistort,
        ]
        else throw( `Incorrect type specified: ${type}` );
    }

    /**
     *             transform: `rotateY(${angleX}deg) rotateX(${angleY}deg) scale(1.15)`,
            perspective: `${halfWidth * 3}px`,
            filter: `drop-shadow(${-xShadow}px ${yShadow}px 15px ${DROP_SHADOW_COLOR})`,
     */
    // keyframes to rotate the ticket in a counter clockwise direction
    const keyframes = `
    @keyframes circle-ticket {
        // 0 -> center
        0% {
            transform: rotateY(${getAngle( 'angle' )}deg) rotateX(${getAngle( 'angle' )}deg) scale(1.15);
            filter: drop-shadow(${-getAngle( 'shadow' )}px ${getAngle( 'angle' )}px 15px ${shadowColor});
        }
        // I -> -x, +y
        3% {
            transform: rotateY(${getAngle( 'angle', { xDisplace: -xAnimate } )}deg) rotateX(${getAngle( 'angle', { yDisplace: yAnimate } )}deg) scale(1.15);
            filter: drop-shadow(${-getAngle( 'shadow', { xDisplace: -xAnimate } )}px ${getAngle( 'angle', { yDisplace: yAnimate } )}px 15px ${shadowColor});
        }
        // II -> +x, +y
        47% {
            transform: rotateY(${getAngle( 'angle', { xDisplace: xAnimate } )}deg) rotateX(${getAngle( 'angle', { yDisplace: yAnimate } )}deg) scale(1.15);
            filter: drop-shadow(${-getAngle( 'shadow', { xDisplace: xAnimate } )}px ${getAngle( 'angle', { yDisplace: yAnimate } )}px 15px ${shadowColor});
        }
        // III -> +x, -y
        73% {
            transform: rotateY(${getAngle( 'angle', { xDisplace: xAnimate } )}deg) rotateX(${getAngle( 'angle', { yDisplace: -yAnimate } )}deg) scale(1.15);
            filter: drop-shadow(${-getAngle( 'shadow', { xDisplace: xAnimate } )}px ${getAngle( 'angle', { yDisplace: -yAnimate } )}px 15px ${shadowColor});
        }
        // IV -> -x, -y
        97% {
            transform: rotateY(${getAngle( 'angle', { xDisplace: -xAnimate } )}deg) rotateX(${getAngle( 'angle', { yDisplace: -yAnimate } )}deg) scale(1.15);
            filter: drop-shadow(${-getAngle( 'shadow', { xDisplace: -xAnimate } )}px ${getAngle( 'angle', { yDisplace: -yAnimate } )}px 15px ${shadowColor});
        }
    }
    `;

    return keyframes;

    // angle of ticket distort
    // let angleX = ( xAnimate! - halfWidth ) / xDistort;
    // let angleY = ( yAnimate! - halfHeight ) / yDistort;
    // // angle of shadow distort
    // let xShadow = ( xAnimate! - halfWidth ) / shadowDistort;
    // let yShadow = ( xAnimate! - halfHeight ) / shadowDistort;
}

// calculates the animation depth for both x and y directions
const calcAnimations = (
    target: HTMLElement,
    scale: Scale={},
): { [ key: string ]: number[] } => {

    const rect = target.getBoundingClientRect();

    /* CONTENT */
    const { xScale=5, yScale=5 } = scale;

    // very bottom right coordinates
    const xRight = rect.right - rect.left;
    const yRight = rect.bottom - rect.top;
    // center coordinates
    const xCenter = xRight / 2;
    const yCenter = yRight / 2;
    // subtract very center coordinates from very bottom right coordinates -> thats the max distance we can animate
    const xMax = xRight - xCenter;
    const yMax = yRight - yCenter;
    // scale the max distance
    const xAnimate = xMax / xScale;
    const yAnimate = yMax / yScale;

    return {
        center: [ xCenter, yCenter ],
        animate: [ xAnimate, yAnimate ],
    };
    
    // setXAnimate( xAnimate );
    // setYAnimate( yAnimate );

    // if ( animateStart === 'right' ) {
    //     setXStartAnimate( xCenter + xAnimate );
    //     setYStartAnimate( yCenter );
    // }
    // else if ( animateStart === 'up' ) {
    //     setXStartAnimate( xCenter );
    //     setYStartAnimate( yCenter + yAnimate );
    // }
    // else if ( animateStart === 'left' ) {
    //     setXStartAnimate( xCenter - xAnimate );
    //     setYStartAnimate( yCenter );
    // }
    // else if ( animateStart === 'down' ) {
    //     setXStartAnimate( xCenter );
    //     setYStartAnimate( yCenter - yAnimate );
    // }
    // else {
    //     throw( `Incorrect animateStart specified: you entered ${animateStart} -> values can be 'left', 'right' 'up', or 'down'`);
    // }
}

export default getTicketAnimation;