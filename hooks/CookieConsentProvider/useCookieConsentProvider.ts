import { useEffect, useCallback, useState } from 'react'; 

const COOKIE_NAME = 'stored_cookie_consent';

export interface ICookieConsentContext {
    consent?: boolean;
    loading: boolean;
    acceptCookies: () => void;
    rejectCookies: () => void;
}

export const useCookieConsentProvider = (): ICookieConsentContext => {
    const [consent, setConsent] = useState<boolean>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const storedConsent = localStorage.getItem(COOKIE_NAME);

        setConsent(Boolean(storedConsent));
        setLoading(false);
    }, []);

    const acceptCookies = useCallback(() => {
        // @ts-ignore
        localStorage.setItem(COOKIE_NAME, true);

        setConsent(true);
    }, []);

    const rejectCookies = useCallback(() => {
        // @ts-ignore
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