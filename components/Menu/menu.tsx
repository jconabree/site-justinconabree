"use client";

import { usePathname } from 'next/navigation';
import { CSSProperties, useCallback, useEffect, useState } from 'react';

import classes from './menu.module.css';
import Link from './link';

type MenuProps = {
    links: {
        url: string;
        text: string;
    }[];
    onChange?: (state: boolean) => void;
};

export default function Menu(props: MenuProps) {
    const { links, onChange } = props;
    const [isOpen, setIsOpen] = useState(false);

    const pathname = usePathname();

    const toggleMenu = useCallback(() => {
        setIsOpen(current => !current);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    useEffect(() => {
        if (typeof onChange === 'function') {
            onChange(isOpen);
        }

        if (isOpen) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    return (
        <div>
            <button
                className={isOpen ? classes.menuButtonClose : classes.menuButton}
                onClick={toggleMenu}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
                <div className={classes.menuButtonIcon}>
                    <span className={classes.burgerTop} />
                    <span className={classes.burgerMiddle} />
                    <span className={classes.burgerBottom} />
                </div>
            </button>
            <nav className={isOpen ? classes.menuOpen : classes.menu} aria-hidden={isOpen}>
                <ul className={classes.navList} style={{ '--number-of-items': links.length } as CSSProperties}>
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
        </div>
    );
}