
/* TYPES */
interface Props {
    className?: string;
    data: string;
    alt: string;
    width: number | string;
    height: number | string;
    type?: 'image/svg+xml';
};

const SVG = ( {
    className='',
    data, // path to SVG
    alt,
    width,
    height,
    type='image/svg+xml',
}: Props ) => {

    return (
        <object className={className}
            width={width} height={height}
            data={data}
            type={type}>
        {alt}
        </object>
    );
}

export default SVG;