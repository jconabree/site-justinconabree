import { Instagram, Linkedin } from 'react-feather';

import classes from './socialLinks.module.css';

export default function SocialLinks() {
    return (
        <div className={classes.root}>
            <div className={classes.item}>
                <a
                    className={classes.link}
                    href="https://www.linkedin.com/company/momentiv-consulting/"
                    target="_blank"
                >
                    <Linkedin />
                </a>
            </div>
            <div className={classes.item}>
                <a
                    className={classes.link}
                    href="https://www.linkedin.com/company/momentiv-consulting/"
                    target="_blank"
                >
                    <Instagram />
                </a>
            </div>
        </div>
    );
};