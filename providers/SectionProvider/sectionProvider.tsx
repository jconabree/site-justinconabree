"use client";

import React, { createContext, useContext } from 'react';

import useSectionProvider from '@/hooks/SectionProvider/useSectionProvider';

const SectionContext = createContext();

const SectionProvider = (props) => {
    const { children } = props;

    const contextValues = useSectionProvider();

    return (
        <SectionContext.Provider value={contextValues}>
            {children}
        </SectionContext.Provider>
    );
};

export default SectionProvider;

export const useSectionContext = () => {
    return useContext(SectionContext);
};