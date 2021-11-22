// dependencies
import { FC } from 'react';
// hooks
import { useClickOutsideRef } from '../../hooks';
// elements
import { ToggleButton } from '../../elements';


/* TYPES */
interface Props {
    // customization
    id?: string;
    className?: string;
    // states
    isActive: boolean;
    closeModal: () => void;
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
    closeModal,
    showX=true,
    showBackdrop=false,
    ariaLabelledBy,
    ariaDescribedBy
} ) => {

    /* HOOKS */
    const [ ref ] = useClickOutsideRef<HTMLElement>( closeModal );

    const modalClasses = `
        modal-wrapper
        ${className}
        ${isActive ? 'active' : ''}
    `;

    return (
            <section id={id} ref={ref} className={modalClasses}
                role='dialog' aria-labelledby={ariaLabelledBy} aria-describedby={ariaDescribedBy}>
                    {
                        showX && (
                            <ToggleButton className='x-close' onClick={closeModal}
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