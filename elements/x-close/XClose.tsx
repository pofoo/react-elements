// elements
import { ToggleButton } from '../button';
// types
import type { Colors, OnClick } from 'types';

/* TYPES */
interface Props {
    className?: string;
    onClick: OnClick;
    ariaLabel: string;
    isPressed: boolean;
    backgroundColor?: 'brand-blue' | 'green' | 'blue' | 'yellow' | 'orange' | 'purple' | 'pink';
    showBackground?: boolean;
    shape?: 'square' | 'circle';
}

const XClose = ( {
    className,
    onClick,
    ariaLabel,
    isPressed,
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
            ariaLabel={ariaLabel} isPressed={isPressed}>
            &times;
        </ToggleButton>
    )
}

export default XClose;