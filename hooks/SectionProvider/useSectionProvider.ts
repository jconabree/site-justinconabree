"use client";

import { useCallback, useState } from 'react';

interface Section {
    title: string;
    element: HTMLElement;
}

interface SectionList {
    [key: string]: Section;
}

export interface ISectionContext {
    sections: SectionList,
    currentSection: string|null
    addSection: (sectionId: string, title: string, element: HTMLElement) => () => void;
}

export default () => {
    const [sections, setSections] = useState<SectionList>({});
    const [currentSection, setCurrentSection] = useState<string|null>(null);

    const addSection = useCallback((sectionId: string, title: string, element: HTMLElement): () => void => {
        // TODO change to an array so we can easily track order
        setSections(currentSections => ({
            ...currentSections,
            [sectionId]: {
                title,
                element
            }
        }));

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setCurrentSection(sectionId);
            }
        }, {
            threshold: 0.5
        });

        observer.observe(element);

        return () => {
            observer.unobserve(element);

            setSections(currentSections => {
                return Object.fromEntries(
                    Object.entries(currentSections)
                        .filter(([id]) => id === sectionId)
                )
            })
        };
    }, []);

    return {
        sections,
        currentSection,
        addSection
    };
};