// elements
import SVG from '../svg';

/* TYPES */
interface Props {
    className?: string;
    type: 'word' | 'design';
    width: number;
    height: number
}

const Logo = ( { 
    className='',
    type,
    width,
    height,
}: Props ) => {

    let data;
    if ( type === 'word' ) data = '/text-logo.svg';
    if ( type === 'design' ) data = '/favicon.svg'

    if ( !data ) throw 'Error getting data path for logo'

    return (
        <SVG className={className} 
            data={data}
            alt={`${process.env.NEXT_PUBLIC_SITE_NAME} ${type} logo`}
            width={width}
            height={height} />
    );
}

export default Logo;