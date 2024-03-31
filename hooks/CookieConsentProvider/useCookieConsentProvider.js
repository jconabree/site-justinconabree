import { useEffect, useCallback, useState } from 'react'; 

const COOKIE_NAME = 'stored_cookie_consent';

export const useCookieConsentProvider = () => {
    const [consent, setConsent] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedConsent = localStorage.getItem(COOKIE_NAME);

        setConsent(storedConsent);
        setLoading(false);
    }, []);

    const acceptCookies = useCallback(() => {
        localStorage.setItem(COOKIE_NAME, true);

        setConsent(true);
    }, []);

    const rejectCookies = useCallback(() => {
        localStorage.setItem(COOKIE_NAME, false);
        setConsent(false)
    }, [])

    return {
        consent,
        loading,
        acceptCookies,
        rejectCookies
    };
};