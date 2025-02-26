"use client";

import React, { createContext, useContext } from 'react';
import Script from 'next/script';

import useGoogleRecaptchaProvider, { IGoogleRecaptchaContext } from '@/hooks/GoogleRecaptchaProvider/useGoogleRecaptchaProvider';

const GoogleRecaptchaContext = createContext<IGoogleRecaptchaContext>({} as IGoogleRecaptchaContext);

interface GoogleRecaptchaProviderProps  {
    children: React.ReactNode;
    recaptchaKey?: string;
}

const GoogleRecaptchaProvider = (props: GoogleRecaptchaProviderProps) => {
    const { children, recaptchaKey } = props;

    const { handleScriptLoadError, ...contextValues } = useGoogleRecaptchaProvider({ recaptchaKey });
    const { scriptUrl } = contextValues;

    return (
        <GoogleRecaptchaContext.Provider value={contextValues}>
            {children}
            {scriptUrl !== null && (
                <Script
                    src={scriptUrl}
                    onError={handleScriptLoadError}
                />
            )}
        </GoogleRecaptchaContext.Provider>
    );
};

export default GoogleRecaptchaProvider;

export const useGoogleRecaptchaContext = () => {
    return useContext(GoogleRecaptchaContext);
};