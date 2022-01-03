// depdnencies
import { FC } from 'react';

/* TYPES */
interface Props {
    id: string;
    className?: string;
    isShow?: boolean;
    from?: 'top-right' | 'top-middle' | 'top-left' | 'bottom-right' | 'bottom-middle' | 'bottom-left';
    // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions
    // ^ check for additional roles in the future.
    role?: 'status' | 'alert' | 'timer';
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
    role='status',
} ) => {

    /* CLASSNAMES */
    const notificationClasses = `
        notification-wrapper
        ${isShow ? 'show' : 'not-show'}
        ${from}
        ${className}
    `;

    return (
        <section id={id} className={notificationClasses} role={role}>
            {children}
        </section>
    )
}

export default Notification;