
/* TYPES */
interface WordContent {
    text: string;
}

interface WordProps {
    content: WordContent;
}

const Word  = ( { 
    content: {
        text,
    }
}: WordProps ) => {

    return (
        <div className='word-wrapper'>
            <h1>{text}</h1>
        </div>
    );
}

export default Word;