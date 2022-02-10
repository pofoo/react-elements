
/* TYPES */
export interface Props {
    id: string;
    className?: string;
}

const TagInput = ( {
    id,
    className,
}: Props ) => {

    return (
        <section id={id} className={className}>
            Tag Input
        </section>
    )
}
export default TagInput;