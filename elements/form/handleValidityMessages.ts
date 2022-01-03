// types
import { TextInputTypes } from './types';

const handleTextInputValidityMessages = ( 
    target: HTMLInputElement,
    type: TextInputTypes,
) => {

    if ( target.validity.valueMissing )
        target.setCustomValidity( "Don't forget to fill this out!" );

    else if ( target.willValidate )
        target.setCustomValidity( '' );

    else if ( target.validity.patternMismatch ) {
        const value = target.value;

        if ( type === 'email' ) {
            if ( value.includes( '@' ) )
                target.setCustomValidity( `What comes after ${value} ?!` );
            else
                target.setCustomValidity( `Hmmm... ${value} does not have an @ in it...?` );
        }
        else if ( type === 'username' ) {

        }
        else if ( type === 'password' ) {

        }
        else if ( type === 'text' ) {

        }
    }
}

export {
    handleTextInputValidityMessages,
}