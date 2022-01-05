// dependencies
import { FC, useEffect } from 'react';
// types
import { SetState, Colors } from 'types';
// installed utils
import { CSSTransition } from 'react-transition-group';

/* TYPES */
interface Props {
    id: string;
    className?: string;
    isShow: boolean;
    setIsShow: SetState<boolean>;
    // TO-DO - implement other notification enter methods
    from?: 'top-right' | 'top-middle' | 'top-left' | 'bottom-right' | 'bottom-middle' | 'bottom-left';
    // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions
    // ^ check for additional roles in the future.
    role?: 'status' | 'alert' | 'timer';
    showTime?: number; // amount of time to show the notification in milliseconds
    isRounded?: boolean;
    color?: 'brand-blue' | 'green' | 'blue' | 'yellow' | 'orange' | 'purple' | 'pink';
}

/**
 * Notification slide-in.
 */
const Notification: FC<Props> = ( {
    children,
    id,
    className='',
    isShow,
    setIsShow,
    from='top-right',
    role='status',
    showTime=3000,
    isRounded=true,
    color='pink',
} ) => {

    /* FUNCTIONS */
    const handleEnter = () => {
        setTimeout( () => {
            setIsShow( false );
        }, showTime );
    }
    
    /* CLASSNAMES */
    const notificationClasses = `
        notification
        ${from}
        ${isRounded ? 'rounded' : ''}
        ${color}
        ${className}
    `;

    /* PROPS */
    const timeout = {
        appear: 300,
        enter: 300,
        exit: 450,
    }

    // prevents bottom scrol bar from appearing when notification is sliding in from off-screen
    useEffect( () => {
        if ( isShow )
            document.body.classList.add( 'overflow-transition' );
        else
            document.body.classList.remove( 'overflow-transition' );
    }, [ isShow ] ); 

    return (
        <CSSTransition in={isShow} timeout={timeout} classNames={`notification-${from}`} 
            unmountOnExit onEnter={handleEnter}>
            <section id={id} className={notificationClasses} role={role}>
                {children}
            </section>
        </CSSTransition>
    )
}

export default Notification;