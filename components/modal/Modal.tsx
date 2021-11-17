// dependencies
import { FC } from 'react';
// elements
import { ToggleButton } from '../../elements';


/* TYPES */
interface Props {
    // customization
    id?: string;
    className?: string;
    // states
    isActive: boolean;
    toggleModal: () => void;
    // styling
    showX?: boolean;
    showBackdrop?: boolean;
    // accessibility
    ariaLabelledBy: string;
    ariaDescribedBy: string;
}

/**
 * Modal wrapper component.
 */
const Modal: FC<Props> = ( {
    children,
    id,
    className,
    isActive,
    toggleModal,
    showX=true,
    showBackdrop=false,
    ariaLabelledBy,
    ariaDescribedBy
} ) => {

    const modalClasses = `
        modal-wrapper
        ${className}
        ${isActive ? 'active' : ''}
    `;

    return (
            <section id={id} className={modalClasses}
                role='dialog' aria-labelledby={ariaLabelledBy} aria-describedby={ariaDescribedBy}>
                    {
                        showX && (
                            <ToggleButton className='x-close' onClick={toggleModal}
                                ariaLabel='close modal' isPressed={isActive}>
                                &times;
                            </ToggleButton>
                        )
                    }
                {children}
                {
                    showBackdrop && (
                        <span className='backdrop' role='presentation' />
                    )
                }
            </section>
    )
}

export default Modal;