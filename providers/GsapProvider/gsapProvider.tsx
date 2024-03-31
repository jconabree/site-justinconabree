"use client";

import React, { createContext, useContext } from 'react';

import { useGsapProvider } from '@/hooks/GsapProvider/useGsapProvider';

const GsapContext = createContext();

const GsapProvider = (props) => {
    const { children } = props;

    const contextValues = useGsapProvider();

    return (
        <GsapContext.Provider value={contextValues}>
            {children}
        </GsapContext.Provider>
    );
};

export default GsapProvider;

export const useGsapContext = () => {
    return useContext(GsapContext);
};