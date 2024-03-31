"use client";

import React, { createContext, useContext } from 'react';

import { useCookieConsentProvider } from '@/hooks/CookieConsentProvider/useCookieConsentProvider';

const CookieConsentContext = createContext();

const CookieConsentProvider = (props) => {
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