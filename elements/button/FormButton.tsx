// elements
import SVG from '../svg';
import { Puff, Success, Fail } from '../loader';
// partials
import Ripple from './ripple';
// types
import { ConditionalProps } from 'types';
// import { Colors } from 'types';

/* TYPES */
interface Content {
    text: string;
    icon?: {
        data: string;
        alt: string;
    }
}

/* USE THIS TYPING IN PRODUCTION - DOSEN'T WORK IN STORYBOOK */
// type Props = ConditionalProps<
//     {
//         // customization
//         className?: string;
//         content: Content;
//         // button states / accessibility
//         isDisabled?: boolean;
//         isLoading?: boolean;
//         isSuccess?: boolean;
//         isFail?: boolean;
//         loaderAriaLabel?: string;
//         successAriaLabel?: string;
//         failAriaLabel?: string;
//         // styling
//         type?: 'submit' | 'reset';
//         size?: 'sm' | 'md' | 'lg';
//         color?: 'brand-blue' | 'green' | 'blue' | 'yellow' | 'orange' | 'purple' | 'pink';
//         fill?: 'gradient';
//         isRounded?: boolean;
//         hover?: 'lift' | 'press' | 'pulse' | 'glimmer';
//         click?: 'ripple';
//     }, 
//         'isSuccess',
//     {
//         // if isSuccess is set to true, isFail must be false
//         isSuccess: true;
//         isFail: false;
//     } |
//     {
//         // if isFail is set to true, isSuccess must be false
//         isFail: true;
//         isSuccess: false;
//     }
// >

interface Props {
    // customization
    className?: string;
    content: Content;
    // button state
    isDisabled?: boolean;
    isLoading?: boolean;
    isSuccess?: boolean;
    isFail?: boolean;
    // TO-DO - if type is submit, ariaLabel must be provided
    // accessibility
    ariaLabel: string;
    // styling
    type?: 'submit' | 'reset';
    size?: 'sm' | 'md' | 'lg';
    color?: 'brand-blue' | 'green' | 'blue' | 'yellow' | 'orange' | 'purple' | 'pink';
    fill?: 'gradient';
    isRounded?: boolean;
    hover?: 'lift' | 'press' | 'pulse' | 'glimmer';
    click?: 'ripple';
    onClick?: ( ...args: any ) => void;
}


/**
 * Submit and Reset Button for Forms.
 */
const FormButton = ( {
    className='',
    content,
    isDisabled=false,
    isLoading=false,
    isSuccess=false,
    isFail=false,
    ariaLabel,
    type='submit',
    size='md',
    color='green',
    fill,
    isRounded=true,
    hover='lift',
    click='ripple',
    ...rest
}: Props ) => {

    /* ERRORS */
    // isFail and isSuccess can't be set to true at the same time
    if ( isSuccess && isFail ) 
        throw( SyntaxError( 'isSuccess and isFail cannot be both be set to true at the same time' ) );

    /* CONTENT */
    const { text, icon=null } = content;

    /* ACCESSIBILITY */
    const loaderAriaLabel = `${ariaLabel} loader`;
    const successAriaLabel = `${ariaLabel} submitted`;
    const failAriaLabel = `${ariaLabel} failed to submit`;

    // everything that is loading or animating must be disabled
    const disabled = isLoading || isSuccess || isFail ? true : isDisabled;

    /* CLASSNAMES */
    const buttonClasses = `
        button-wrapper
        form-button-wrapper
        ${className}
        ${isLoading ? 'loading' : ''}
        ${isSuccess ? 'success' : ''}
        ${isFail ? 'fail' : ''}
        ${color}
        button--${size}
        ${disabled ? 'disabled' : ''}
        ${fill}
        ${isRounded ? 'rounded' : ''}
        ${hover}
        ${click !== 'ripple' && click}
    `;

    return (
        <button className={buttonClasses} aria-label={ariaLabel}
            type={type} disabled={disabled} {...rest}>
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
            {
                isLoading && (
                    <Puff color={color} ariaLabel={loaderAriaLabel} />
                )
            }
            {
                isSuccess && (
                    <Success ariaLabel={successAriaLabel} />
                )
            }
            {
                isFail && (
                    <Fail ariaLabel={failAriaLabel} />
                )
            }
        </button>
    );
}

export default FormButton;