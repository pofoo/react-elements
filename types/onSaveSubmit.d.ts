type OnSaveSubmit<T extends object = any> = ( input: T ) => 
    ( Promise<boolean | undefined | void> ) | ( boolean | undefined | void );

export default OnSaveSubmit;