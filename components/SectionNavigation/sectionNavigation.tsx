"use client";

import { useCallback } from 'react';
import { useSectionContext } from '@/providers/SectionProvider';

import classes from './sectionNavigation.module.css';

export default function SectionNavigation() {
    const { sections, currentSection } = useSectionContext();

    if (!sections || !Object.keys(sections).length) {
        return null;
    }

    return (
        <div className={classes.root}>
            <nav className={classes.navigation}>
                {Object.entries(sections).map(([sectionId, data]) => {
                    const itemClass = currentSection === sectionId ? classes.currentItem : classes.item;
                    const handleClick = () => {
                        data.element.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }

                    return (
                        <button
                            key={sectionId}
                            className={itemClass}
                            onClick={handleClick}
                        >
                            <div className={classes.circle} />
                            <div className={classes.label}>{data.title}</div>
                        </button>
                    );
                })}
            </nav>
        </div>
    );
};