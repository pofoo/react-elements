// dependencies
import { FC } from 'react';

/* TYPES */
interface Props {
    className?: string;
    isActive: boolean;
}

/**
 * Modal wrapper component.
 */
const Modal: FC<Props> = ( {
    children,
    className,
    isActive,
} ) => {

    const modalClasses = `
        modal-wrapper
        ${className}
    `;

    return (
        <div className={modalClasses}>
            {children}
        </div>
    )
}

export default Modal;