"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react';

import Logo from '../Logo';
import Menu from '../Menu';

import classes from './header.module.css';

const menuLinks = [{
    url: '/',
    text: 'Home'
}, {
    url: '/projects',
    text: 'Projects'
}, {
    url: '/contact',
    text: 'Contact'
}]

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();
    const isHome = pathname === '/';

    useEffect(() => {
        if (!globalThis?.document?.addEventListener) {
            return;
        }

        const handleScroll = () => {
            setIsScrolled(globalThis.scrollY > 120);
        };

        globalThis.document.addEventListener('scroll', handleScroll);

        handleScroll();

        return () => {
            globalThis.document.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return (
        <header className={isScrolled ? classes.headerScrolled : classes.header}>
            <div className={classes.contact}>
                <Link className="button-primary block py-2 px-6 font-bold transition-colors bg-white" href="/contact">Contact</Link>
            </div>
            <div className={classes.logo}>
                <Link href="/">
                    <Logo width={200} className={`text-lg font-semibold font-header tracking-wide transition-colors ${isHome && !isScrolled ? 'text-white' : ''}`} />
                </Link>
            </div>
            <div className={classes.actions}>
                <Menu links={menuLinks} />
            </div>
        </header>
    )
};

export default Header;