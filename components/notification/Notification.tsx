// depdnencies
import { FC } from 'react';

/* TYPES */
interface Props {
    id: string;
    className?: string;
    isShow?: boolean;
    from?: 'top-right' | 'top-middle' | 'top-left' | 'bottom-right' | 'bottom-middle' | 'bottom-left';
}

/**
 * Notification slide-in.
 */
const Notification: FC<Props> = ( {
    children,
    id,
    className='',
    isShow=false,
    from='top-right',
} ) => {

    /* CLASSNAMES */
    const notificationClasses = `
        notification-wrapper
        ${isShow ? 'show' : 'not-show'}
        ${from}
        ${className}
    `;

    return (
        <section id={id} className={notificationClasses}>
            {children}
        </section>
    )
}

export default Notification;