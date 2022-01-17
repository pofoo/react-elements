// types
import { TextInputTypes } from './types';
// lib
import { aOrAn, toTitleCase, hasNumber, hasLetter,
    hasSpecialChar } from '../../lib';

const handleTextInputValidityMessages = ( 
    target: HTMLInputElement,
) => {
    if ( target.willValidate ) {
        if ( target.validity.valueMissing )
            target.setCustomValidity( "Don't forget to fill this out!" );
    
        else if ( target.validity.patternMismatch ) {
            const value = target.value;
            const type = target.type as TextInputTypes;
    
            if ( type === 'email' ) {
                if ( value.includes( '@' ) )
                    target.setCustomValidity( `What comes after ${value} ?!` );
                else
                    target.setCustomValidity( `Hmmm... ${value} does not have an @ in it...?` );
            }
            else if ( type === 'username' ) {}
            // TO-DO - password mismatch custom validity
            else if ( type === 'password' ) {
                if ( value.length < 8 )
                    target.setCustomValidity( 'Password must be at least 8 characters' );
                else if ( !hasNumber( value ) )
                    target.setCustomValidity( 'Password must have at least one number' );
                else if ( !hasLetter( value ) )
                    target.setCustomValidity( 'Password must contain at least one letter' );
                else if ( !hasSpecialChar( value) )
                    target.setCustomValidity( 'Password must contain as least one special character' );
                
            }
            else if ( type === 'text' ) {
                const name = target.name;
    
                target.setCustomValidity( `This dosen't look like ${aOrAn(name)} ${toTitleCase(name)}`)
            }
        }
        else
            target.setCustomValidity( '' );
    }
}

export {
    handleTextInputValidityMessages,
}