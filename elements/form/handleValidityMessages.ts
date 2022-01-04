// types
import { TextInputTypes } from './types';
// lib
import { aOrAn, toTitleCase } from '../../lib';

const handleTextInputValidityMessages = ( 
    target: HTMLInputElement,
) => {
    if ( target.validity.valueMissing )
        target.setCustomValidity( "Don't forget to fill this out!" );

    else if ( target.willValidate )
        target.setCustomValidity( '' );

    else if ( target.validity.patternMismatch ) {
        const value = target.value;
        const type = target.type as TextInputTypes;

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
            const name = target.name;

            target.setCustomValidity( `This dosen't look like ${aOrAn(name)} ${toTitleCase(name)}`)
        }
    }
}

export {
    handleTextInputValidityMessages,
}