import Link from 'next/link';

import Logo from '@/components/Logo';

import classes from './footer.module.css';

const Footer = () => {
    return (
        <footer className={classes.footer}>
            <div className={classes.recaptchaLegal}>
                This site is protected by reCAPTCHA and the Google
                <a href="https://policies.google.com/privacy">Privacy Policy</a> and
                <a href="https://policies.google.com/terms">Terms of Service</a> apply.
            </div>
            <div className={classes.mainRow}>
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
            </div>
        </footer>
    )
};

export default Footer;