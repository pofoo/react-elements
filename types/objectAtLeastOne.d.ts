// must contatin AT LEAST one of the key value pairs - specified as a generic when declaring the type
type ObjectAtLeastOne<T, Keys extends keyof T = keyof T> = Partial<T> & { 
    [K in Keys]: Required<Pick<T, K>> 
}[Keys];

export default ObjectAtLeastOne;