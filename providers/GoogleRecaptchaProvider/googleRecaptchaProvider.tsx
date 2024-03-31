"use client";

import React, { createContext, useContext } from 'react';
import Script from 'next/script';

import useGoogleRecaptchaProvider from '@/hooks/GoogleRecaptchaProvider/useGoogleRecaptchaProvider';

const GoogleRecaptchaContext = createContext();

const GoogleRecaptchaProvider = (props) => {
    const { children, recaptchaKey } = props;

    const { scriptUrl, ...contextValues } = useGoogleRecaptchaProvider({ recaptchaKey });

    return (
        <GoogleRecaptchaContext.Provider value={contextValues}>
            {children}
            <Script src={scriptUrl} />
        </GoogleRecaptchaContext.Provider>
    );
};

export default GoogleRecaptchaProvider;

export const useGoogleRecaptchaContext = () => {
    return useContext(GoogleRecaptchaContext);
};