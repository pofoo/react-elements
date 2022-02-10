// elements
import { Heading, SVG } from '../../elements';

/* TYPES */
export interface Content {
    title: string;
    description: string;
    icon: {
        data: string;
        alt: string;
    }
}

export interface Props {
    id: string;
    className?: string;
    content: Content;
    iconSize?: [ number, number ];
}

const Panel = ( {
    id,
    className='',
    content,
    iconSize=[ 400, 400 ],
}: Props ) => {
    /* CONTENT */
    const { title, description, icon } = content;
    const { data, alt } = icon;
    const [ width, height ] = iconSize;

    /* CLASSNAMES */
    const panelClasses = `
        panel
        ${className}
    `;

    return (
        <section id={id} className={panelClasses}>
            <div className='text'>
                <Heading Tag='h3' content={{ text: title }} />
                <p className='description text-lg'>{description}</p>
            </div>
            <SVG className='panel-icon' data={data} alt={alt}
                width={width} height={height} />
        </section>
    )
}

export default Panel;