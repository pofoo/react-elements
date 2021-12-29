// dependencies
import { FC } from 'react';
// hooks
import { useClickOutsideRef, useFocusTrap } from '../../hooks';
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
    id='',
    className='',
    isActive,
    closeModal,
    showBackdrop=true,
    ariaLabelledBy,
    ariaDescribedBy
} ) => {

    /* HOOKS */
    const [ ref ] = useClickOutsideRef<HTMLDivElement>( closeModal );

    const modalContainerClasses = `
        modal-container
        ${isActive ? 'active' : 'not-active'}
    `;

    const modalWrapperClasses = `
        modal-wrapper
        ${className}
    `;

    // attach focus trap to modal
    useFocusTrap( ref, isActive )

    return (
        <div id={id} className={modalContainerClasses}>
            <div ref={ref} className={modalWrapperClasses}
                role='dialog' aria-labelledby={ariaLabelledBy} aria-describedby={ariaDescribedBy}>
                {children}
                <ToggleButton className='x-close' onClick={closeModal}
                    ariaLabel='close modal' isPressed={isActive}>
                    &times;
                </ToggleButton>
            </div>
            {
                showBackdrop && (
                    <span className='backdrop' role='presentation' />
                )
            }
        </div>
    )
}

export default Modal;