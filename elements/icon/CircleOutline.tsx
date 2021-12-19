
/* TYPES */
interface Props {
    className?: string;
}

const CircleOutline = ( {
    className='',
}: Props ) => {

    const circleClasses = `
        circle-wrapper
        ${className}
    `;

    return (
        <span className={circleClasses}>
            <span className='half-cirlce'>
                <span className='border clip' />
            </span>
            <span className='border fixed' />
        </span>
    )
}

export default CircleOutline;