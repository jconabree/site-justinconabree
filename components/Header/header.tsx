"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

import Logo from '../Logo';
import Menu from '../Menu';

import classes from './header.module.css';
import Button from '../Button';

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
                <Button>Contact</Button>
            </div>
            <div className={classes.logo}>
                <Link href="/">
                    <Logo width={200} />
                </Link>
            </div>
            <div className={classes.actions}>
                <Menu links={menuLinks} />
            </div>
        </header>
    )
};

export default Header;