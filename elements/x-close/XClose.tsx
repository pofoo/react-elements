// elements
import { ToggleButton } from '../button';
// types
// import type { Colors } from 'types';

/* TYPES */
interface Props {
    className?: string;
    onClick: () => void;
    ariaLabel: string;
    backgroundColor?: 'brand-blue' | 'green' | 'blue' | 'yellow' | 'orange' | 'purple' | 'pink';
    showBackground?: boolean;
    shape?: 'square' | 'circle';
}

const XClose = ( {
    className,
    onClick,
    ariaLabel,
    backgroundColor='pink',
    showBackground=false,
    shape='square',
}: Props ) => {
    /* CLASSNAMES */
    const xCloseClasses = `
        x-close
        ${showBackground ? 'background' : ''}
        ${backgroundColor ? backgroundColor: ''}
        ${shape}
        ${className}
    `;

    return (
        <ToggleButton className={xCloseClasses} onClick={onClick}
            ariaLabel={ariaLabel} ariaHasPopup={false} isPressed={true}>
            &times;
        </ToggleButton>
    )
}

export default XClose;