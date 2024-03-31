"use client";

import React, { createContext, useContext } from 'react';

import { useCookieConsentProvider, ICookieConsentContext } from '@/hooks/CookieConsentProvider/useCookieConsentProvider';

const CookieConsentContext = createContext<ICookieConsentContext>({} as ICookieConsentContext);

interface CookieConsentProviderProps {
    children: React.ReactNode;
}

const CookieConsentProvider = (props: CookieConsentProviderProps) => {
    const { children } = props;

    const contextValues = useCookieConsentProvider();

    return (
        <CookieConsentContext.Provider value={contextValues}>
            {children}
        </CookieConsentContext.Provider>
    );
};

export default CookieConsentProvider;

export const useCookieConsentContext = () => {
    return useContext(CookieConsentContext);
};