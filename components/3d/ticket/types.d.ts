export interface Distort {
    xDistort?: number;
    yDistort?: number;
    shadowDistort?: number;
}

export interface Displace {
    xDisplace?: number;
    yDisplace?: number;
}

export interface Scale {
    xScale: number;
    yScale: number;
}

export interface TicketAnimation {
    animation: Animation;
    perspective: string;
}

export interface Styles {        
    transform: string;
    filter: string;
    perspective?: string;
}

export interface ParentStyles {
    perspective: string;
}

export interface AnimationStyles {
    perspective: string;
}