
/* TYPES */
interface Props {
    className?: string;
    color?: 'brand-blue' | 'green' | 'blue' | 'yellow' | 'orange' | 'purple' | 'pink';
    ariaLabel: string;
}

const Dots = ( {
    className='',
    color='green',
    ariaLabel,
}: Props ) => {

    /* CLASSNAMES */
    const dotsWrapperClasses = `
        dots-wrapper
        ${color}
        ${className}
    `;

    return (
        <span className={dotsWrapperClasses} role='presentation' aria-label={ariaLabel}>
            <span className='dot' role='presentation' />
            <span className='dot' role='presentation' />
            <span className='dot' role='presentation' />
        </span>
    )
}

export default Dots;