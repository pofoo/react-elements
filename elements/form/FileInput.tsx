
/* TYPES */
interface Props {
    className?: string;
    accept?: File;
}

const FileInput = ( {
    className=''
}: Props ) => {
    
    const fileInputClasses = `
        file-input
        ${className}
    `;
    return (
        <input className={fileInputClasses} type='file' />
    )
}

export default FileInput;