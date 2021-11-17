// dependencies
import { FC } from 'react';
// elements
import { ToggleButton } from '../../elements';
// installed hooks
import useOnclickOutside from "react-cool-onclickoutside";
// installed components
import FocusTrap from 'focus-trap-react';



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

    /* HOOKS */
    const ref = useOnclickOutside( toggleModal );

    const modalClasses = `
        modal-wrapper
        ${className}
        ${isActive ? 'active' : ''}
    `;

    const focusTrapOptions = {
        // does not focus anything in the modal by default
        initialFocus: false,
    }

    // focus trap - is there going to be a problem if only one focus trap can be open at a time?
    // if it takes up the whole screen, i don't think their will be any problems... yeah i dont think so
    // wat is their are no tabbable elements in the Modal? 
    // video popup?
    // TO-DO - add backdrop styling
    return (
        <FocusTrap focusTrapOptions={focusTrapOptions}>
            <section id={id} ref={ref} className={modalClasses}
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
        </FocusTrap>
    )
}

export default Modal;