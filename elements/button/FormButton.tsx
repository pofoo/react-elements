// elements
import SVG from '../svg';
// partials
import Ripple from './ripple';
// installed elements
import { PuffLoader } from 'react-spinners';
// types
import { MouseEvent } from 'react';
// import { Colors } from 'types';

/* TYPES */
interface Content {
    text: string;
    icon?: {
        data: string;
        alt: string;
    }
}

interface Props {
    // customization
    className?: string;
    content: Content;
    // event handlers
    onClick: ( event: MouseEvent<HTMLButtonElement> ) => void;
    // button states / accessibility
    isDisabled?: boolean;
    isLoading?: boolean;
    // styling
    type?: 'submit' | 'reset';
    size?: 'sm' | 'md' | 'lg';
    color?: 'brand-blue' | 'green' | 'blue' | 'yellow' | 'orange' | 'purple' | 'pink';
    fill?: 'gradient';
    isRounded?: boolean;
    hover?: 'lift' | 'press' | 'pulse' | 'glimmer';
    click?: 'ripple';
}

/**
 * Submit and Reset Button for Forms.
 */
const FormButton = ( {
    className='',
    content,
    onClick,
    isDisabled=false,
    isLoading=false,
    type='submit',
    size='md',
    color='green',
    fill,
    isRounded=true,
    hover='lift',
    click='ripple',
}: Props ) => {

    /* CONTENT */
    const { text, icon=null } = content;

    /* CLASSNAMES */
    const buttonClasses = `
        button-wrapper
        form-button-wrapper
        ${className}
        ${isLoading && 'loading'}
        ${color}
        button--${size}
        ${isDisabled && 'disabled'}
        ${fill}
        ${isRounded ? 'rounded' : ''}
        ${hover}
        ${click !== 'ripple' && click}
    `;

    const override = `
        display: block;
        margin: 0;
        padding: 0;
        top: 50%;
        left: 50%;
        transform: translate( -50%, -70% );
        border-color: red;
    `;

    return (
        <>
        <button className={buttonClasses} 
            onClick={onClick} disabled={isDisabled}
            type={type}>
            {
                icon && (
                    // TO-DO - adjust width and height depending on button size
                    // use a dummy icon to see how it would look
                    <SVG data={icon.data} alt={icon.alt}
                        width={50} height={50} />
                )
            }
            <span className='form-button-text'>{text}</span>
            {
                click === 'ripple' && (
                    <Ripple />
                )
            }
                
        <PuffLoader css={override} loading={true} size={50}/>
        </button>

        </>
    );
}

export default FormButton;