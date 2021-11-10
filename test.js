const count = 1;
const obj = {
    word: 'hello',
    anotherWord: 'hello again',
};

console.log( { 
    ...obj,
    // this basically takes the variable count instead of the literal word count
    [count]: obj,
} )