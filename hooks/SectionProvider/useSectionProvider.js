"use client";

import { useCallback, useState } from 'react';

export default () => {
    const [sections, setSections] = useState({});
    const [currentSection, setCurrentSection] = useState(null);

    const addSection = useCallback((sectionId, title, element) => {
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