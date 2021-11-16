// conditional props for React components
// extends base props with necessary additional props types
// speciifed as a generic with these 3 parameters
// 1: base prop types
// 2: prop key in string notation that will be extended - i.e 'style'
// 3: extended prop types that include the new altered key value pairs

type RemoveCommonValues<T, TOmit> = {
    [P in keyof T]: TOmit extends Record<P, infer U> ? Exclude<T[P], U> : T[P];
};
  
// not needed in 3.5
type Omit<T, K extends PropertyKey> = Pick<T, Exclude<keyof T, K>>; 

// flatens out the types to make them more readable can be removed
type Id<T> = {} & { 
    [P in keyof T]: T[P]; 
}; 

type ConditionalProps<T, TKey extends keyof TCase, TCase extends Partial<T>> =
    Id<Omit<T, keyof TCase> & TCase>
    | Id<RemoveCommonValues<T, Pick<TCase, TKey>>>;

export default ConditionalProps;