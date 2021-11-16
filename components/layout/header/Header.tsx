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
        header-wrapper
        ${className}
    `;

    return (
        <header className={headerClasses}>
            {children}
        </header>
    )
}

export default Header;