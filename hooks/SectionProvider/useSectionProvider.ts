"use client";

import { useCallback, useState } from 'react';

interface Section {
    title: string;
    element: HTMLElement;
    observer: IntersectionObserver;
    refreshObserver: () => void;
}

interface SectionList {
    [key: string]: Section;
}

export interface ISectionContext {
    sections: SectionList,
    currentSection: string|null
    addSection: (sectionId: string, title: string, element: HTMLElement) => Section;
    removeSection: (sectionId: string) => void;
}

export default () => {
    const [sections, setSections] = useState<SectionList>({});
    const [currentSection, setCurrentSection] = useState<string|null>(null);

    const addSection = useCallback((sectionId: string, title: string, element: HTMLElement): Section => {
        const bind = () => {
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    setCurrentSection(sectionId);
                }
            }, {
                threshold: 0.5
            });

            observer.observe(element);

            return observer;
        };

        const section = {
            title,
            element,
            observer: bind(),
            refreshObserver: function () {
                this.observer.unobserve(element);
                this.observer = bind();
            }
        };

        // TODO change to an array so we can easily track order
        setSections(currentSections => ({
            ...currentSections,
            [sectionId]: section
        }));        

        return section;
    }, []);

    const removeSection = (sectionId: string) => {
        const section = sections[sectionId];
        if (!section) {
            console.warn('Section does not exist', sectionId, sections);
            return;
        }
        section.observer.unobserve(section.element);
        setSections(currentSections => {
            return Object.fromEntries(
                Object.entries(currentSections)
                    .filter(([id]) => id === sectionId)
            )
        });
    }

    return {
        sections,
        currentSection,
        addSection,
        removeSection
    };
};