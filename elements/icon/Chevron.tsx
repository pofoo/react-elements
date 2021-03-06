// types
import { ConditionalProps } from 'types';

/* TYPES */
/* USE THIS TYPING IN PRODUCTION - DOSEN'T WORK IN STORYBOOK */
// type Props = ConditionalProps<
//     {
//         // customization
//         className?: string;
//         // styling
//         transition?: 'flip' | 'x-out';
//         direction?: 'left' | 'right' | 'up' | 'down';
//         // states
//         isActive?: boolean;
//         // accessibility
//         ariaLabel: string;
//     }, 'transition',
//     {
//         // TO-DO - limit this for now, but theoretically we can handle all directions
//         // if the transition type is flip, the starting direction must be up
//         transition: 'flip',
//         direction: 'up',
//     }
// >;

interface Props {
    // customization
    wrapperClassName?: string;
    className?: string;
    // styling
    isRounded?: boolean;
    direction?: 'left' | 'right' | 'up' | 'down';
    transition?: 'flip' | 'x-out';
    // states
    isActive?: boolean;
    // accessibility
    ariaLabel: string;
}

/**
 * Chevron Icon
 */
const Chevron = ( {
    wrapperClassName='',
    className='',
    isRounded=true,
    transition='flip',
    direction='right',
    isActive,
    ariaLabel,
}: Props ) => {

    const chevronWrapperClasses = `
        chevron-wrapper
        ${wrapperClassName}
    `;

    const chevronClasses = `
        chevron
        ${isRounded ? 'rounded' : ''}
        ${transition}
        ${direction}
        ${isActive ? 'active': 'not-active'}
        ${className}
    `;

    return (
        <div className={chevronWrapperClasses}>
            <span className={chevronClasses} 
                role='presentation' aria-label={ariaLabel} />
        </div>
    )
}

export default Chevron;