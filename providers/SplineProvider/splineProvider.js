"use client";

import React, { createContext, useContext } from 'react';

import useSplineProvider from '@/hooks/SplineProvider/useSplineProvider';

const SplineContext = createContext();

const SplineProvider = (props) => {
    const { children, recaptchaKey } = props;

    const { scriptUrl, ...contextValues } = useSplineProvider({ recaptchaKey });

    return (
        <SplineContext.Provider value={contextValues}>
            {children}
        </SplineContext.Provider>
    );
};

export default SplineProvider;

export const useSplineContext = () => {
    return useContext(SplineContext);
};