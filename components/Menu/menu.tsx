"use client";

import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import classes from './menu.module.css';
import Link from './link';

interface MenuProps {
    links: {
        url: string;
        text: string;
    }[]
}
export default function Menu(props: MenuProps) {
    const { links } = props;
    const [isOpen, setIsOpen] = useState(false);

    const pathname = usePathname();

    const toggleMenu = useCallback(() => {
        setIsOpen(current => !current);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.height = '100%';
            document.body.style.overflow = 'hidden';

            return;
        }

        document.body.style.removeProperty('height');
        document.body.style.removeProperty('overflow');
    }, [isOpen]);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <>
            <button className={isOpen ? classes.menuButtonClose : classes.menuButton} onClick={toggleMenu}>
                <div className={classes.menuButtonIcon}>
                    <span className={classes.burgerTop} />
                    <span className={classes.burgerMiddle} />
                    <span className={classes.burgerBottom} />
                </div>
            </button>
            <nav className={isOpen ? classes.menuOpen : classes.menu}>
                <ul className={classes.navList}>
                    {links.map((link) => {
                        const { url, text } = link;

                        return (
                            <li key={url}>
                                <Link
                                    href={url}
                                    className={classes.link}
                                    activeClassName={classes.activeLink}
                                >
                                    {text}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </>
    )
}