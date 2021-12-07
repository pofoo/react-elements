export interface Distort {
    xDistort?: number;
    yDistort?: number;
    shadowDistort?: number;
}

export interface Scale {
    xScale?: number;
    yScale?: number;
}

export interface Displace {
    xDisplace?: number;
    yDisplace?: number;
}

export interface Animation {
    animation?: string;
    perspective?: string;
}

export interface Styles {        
    transform: string;
    filter: string;
    perspective?: string;
}

export type ParentStyles = {
    perspective: string;
}