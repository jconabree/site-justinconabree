"use client";

import React, { createContext, useContext } from 'react';

import useSectionProvider, { ISectionContext } from '@/hooks/SectionProvider/useSectionProvider';

const SectionContext = createContext<ISectionContext>({} as ISectionContext);

interface SectionProviderProps {
    children: React.ReactNode;
}

const SectionProvider = (props: SectionProviderProps) => {
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