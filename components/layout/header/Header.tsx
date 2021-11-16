// dependencies
import { FC } from 'react';

/* TYPES */
interface Props {
    className?: string;
}

const Header: FC<Props> = ( {
    children,
    className,
} ) => {
    
    const headerClasses = `
        header-container
        ${className}
    `;

    return (
        <header className={headerClasses}>
            {children}
        </header>
    )
}

export default Header;