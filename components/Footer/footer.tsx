import Link from 'next/link';

import Logo from '@/components/Logo';
import Marquee from '@/components/Marquee';
import Newsletter from '@/components/Newsletter';
import RichContent from '@/components/RichContent';

import classes from './footer.module.css';

const Footer = () => {
    return (
        <footer className={classes.footer}>
            <div className={classes.copyright}>
                &copy; Copyright {new Date().getFullYear()} Justin Conabree.
            </div>
            <div className={classes.footerLogoWrapper}>
                <Logo className={classes.footerLogo} />
            </div>
            <div className={classes.links}>
                <a href="linkedin" target='_blank'>LinkedIn</a>
                <Link href="/contact">Contact</Link>
            </div>
        </footer>
    )
};

export default Footer;