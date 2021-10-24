// partials
import Word from './Word';

/* TYPES */
interface HelloContent {
    text: string;
}

interface HelloProps {
    id: string;
    content: HelloContent;
}

const Hello = ( { 
    id,
    content: {
        text
    }
}: HelloProps ) => {

    return (
        <section id={id} className='hello-container'>
            <div className='hello-wrapper'>
                <Word content ={{text}} />
            </div>
        </section>
    )
}

export default Hello;