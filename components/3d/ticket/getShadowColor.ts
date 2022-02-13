// types
import { Shadow } from './types';
// lib / constants
import { COLORS, SHADOW_COLORS } from '../../../lib';


const getShadowColor = ( color: Shadow ) => {
    let DROP_SHADOW_COLOR: string;

    if ( color === 'shadow' )
        DROP_SHADOW_COLOR = SHADOW_COLORS[ 2 ];
    else
        DROP_SHADOW_COLOR = COLORS[ color ][ 2 ];
    
    return DROP_SHADOW_COLOR;
}

export default getShadowColor;