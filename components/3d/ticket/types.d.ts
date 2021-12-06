export interface Distort {
    xDistort?: number;
    yDistort?: number;
    shadowDistort?: number;
}

export interface Scale {
    xScale?: number;
    yScale?: number;
}

export type AnimateStart = 'right' | 'left' | 'up' | 'down';

export interface Styles {        
    transform: string;
    filter: string;
    perspective?: string;
}

export type ParentStyles = {
    perspective: string;
}