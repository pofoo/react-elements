// dependencies
import { FC } from 'react';
// types
import { ConditionalProps } from 'types';
// elements
import { ToggleButton } from '../../elements';


/* TYPES */
/* USE THIS TYPING IN PRODUCTION - DOSEN'T WORK IN STORYBOOK */
// this dosen't work lmao
// type Props = ConditionalProps<
//     {
//         // customization
//         id?: string;
//         className?: string;
//         // states
//         isActive: boolean;
//         closeModal?: () => void;
//         // styling
//         showX?: boolean;
//         showBackdrop?: boolean;
//         // accessibility
//         ariaLabelledBy: string;
//         ariaDescribedBy: string;
//     }, 
//         'showX',
//     {
//         showX: true;
//         closeModal: () => void;
//     }
// >

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