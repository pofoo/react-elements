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
    className='',
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

    // this dosent work witout a tabbable element within the dialog box
    // which makes sense, since a user using a keyboard will need to be able to exit out of the dialog box
    // hmmmmmm
    useFocusTrap( 
        ref, 
        isActive,
    )

    return (
        <>
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
        <button>ccas</button>
        </>
    )
}

export default Modal;