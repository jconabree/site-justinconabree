"use client";

import { useEffect, useRef, useState } from 'react';

import { useCookieConsentContext } from '@/providers/CookieConsentProvider';

interface GoogleAnalyticsProps {
    analyticsId?: string|null;
}

declare global {
    var dataLayer: [{ [key: string]: any }?];
}

const GoogleAnalytics = (props: GoogleAnalyticsProps) => {
    const { analyticsId } = props;

    const initialized = useRef<boolean>(false);
    const [scriptSrc, setScriptSrc] = useState<string|null>(null);

    const { consent } = useCookieConsentContext();

    useEffect(() => {
        if (!analyticsId || initialized.current) {
            return;
        }

        initialized.current = true;

        globalThis.dataLayer = globalThis.dataLayer || [];
        globalThis.gtag = function (){ globalThis.dataLayer.push(arguments); }
        globalThis.gtag('js', new Date());
        globalThis.gtag('config', analyticsId);
        globalThis.gtag('consent', 'default', {
            ad_storage: 'denied',
            analytics_storage: 'granted',
            functionality_storage: 'granted',
            personalization_storage: 'granted',
            security_storage: 'granted',
            wait_for_update: 500
        });
    }, [analyticsId]);

    useEffect(() => {
        if (consent === null) {
            return;
        }

        const value = consent ? 'granted' : 'denied';

        globalThis.gtag('consent', 'update', {
            ad_storage: value,
            analytics_storage: value,
            functionality_storage: 'granted',
            personalization_storage: value,
            security_storage: 'granted',
            wait_for_update: 500
        });
    }, [consent]);

    useEffect(() => {
        setTimeout(() => {
            setScriptSrc(`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`);
        }, 3000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    if (!analyticsId) {
        return null;
    }

    if (!scriptSrc) {
        return null;
    }

    return (
        <>
            <script async defer src={scriptSrc}></script>
        </>
    )
}

export default GoogleAnalytics;