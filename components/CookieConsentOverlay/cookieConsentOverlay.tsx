"use client";

import { useCookieConsentContext } from "@/providers/CookieConsentProvider";
import Button from "@/components/Button";

import classes from './cookieConsentOverlay.module.css';

const CookieConsentOverlay = () => {
    const {
        consent,
        loading,
        acceptCookies,
        rejectCookies
    } = useCookieConsentContext();

    if (loading) {
        return null;
    }

    return (
        <div className={consent === null ? classes.open : classes.closed}>
            <div className={classes.content}>
                This site uses cookies for usage analytics and improved user experience.
                <div className={classes.actions}>
                    <Button priority="primary" onClick={acceptCookies}>Accept</Button>
                    <Button onClick={rejectCookies}>Reject</Button>
                </div>
            </div>
        </div>
    )
};

export default CookieConsentOverlay;