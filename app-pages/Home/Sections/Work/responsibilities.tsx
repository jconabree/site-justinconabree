'use client';

import React, { useCallback, useState } from 'react';
import Button from '@/components/Button';
import ArrowLeft from '@/icons/ArrowLeft';
import ChevronLeft from '@/icons/ChevronLeft';
import ChevronRight from '@/icons/ChevronRight';
import classes from './responsibilities.module.css';

type ResponsibilityKey = 'mastery'|'accelerators'|'bestpractices'|'training'|'resource';
type ResponsibilityItem = {
    key: ResponsibilityKey;
    title: string;
    content: React.ReactNode;
};

const responsibilities: ResponsibilityItem[] = [
    {
        key: 'mastery',
        title: 'Jumping into new technologies and mastering them',
        content: (
            <div>
                <p>Technology changes, and changes fast. My current role has me at the forefront of some of those changes (mostly related to the Adobe products we use), making sure we understand what's coming and have the expertise to deal with it.</p>
                <p>I did this with PWA Studio, gaining top community contributor to the core product on github. More recently I've been working with Edge Delivery Services and their new ecosystem.</p>
            </div>
        )
    },
    {
        key: 'accelerators',
        title: 'Creating and maintaining project accelerators and dev tools used by production teams',
        content: (
            <div>
                <p>I create reusable, extensible scaffolding that projects can be built ontop of. These can included features, bug fixes and standards, but also frameworks to extend the platform itself.</p>
                <p>I also take care of ensuring our accelerators are up to date with the core platform first, and sharing that experience with the production teams so they know what to look out for.</p>
                <p>I also make tools developers can use to simplify time consuming or complex tasks. A recent example of this would be creating a CLI tool to go from the Content-Security-Policies header to a well-formatted excel sheet for easy analysis for PCI DSS 4.</p>
            </div>
        )
    },
    {
        key: 'bestpractices',
        title: 'Establishing and implementing best practices',
        content: (
            <div>
                <p>I help establish the standards that are passed onto to production teams. This can be coding standards and testing, but also development patterns for implementing features.</p>
            </div>
        )
    },
    {
        key: 'training',
        title: 'Creating training material and coaching developers',
        content: (
            <div>
                <p>Establishing best practices, creating tools, and mastering new platforms is pointless if the teams working on projects can't use any of it. Part of my job is ensuring that the teams can access the knowledge I've gained so they can implement it themselves.</p>
                <p>This includes tooling documentation, implementations guides and other "how-to"s</p>
                <p>I also do more direct knowledge transfer with coaching, mentoring and onboarding presentations</p>
            </div>
        )
    },
    {
        key: 'resource',
        title: '"Floating" expert joining production teams when needed',
        content: (
            <div>
                <p>Sometimes our production teams are either missing a resource, or are the guinea pigs for a new technology. When this happens, especially the latter, I join their team temporarily to lend my expertise.</p>
                <p>When it's a new technology, I later use my experience with the team to then share with other teams that during their onboarding, making sure that we share the knowledge across the different projects.</p>
            </div>
        )
    },
];

export default function Responsibilities() {
    const [activeDetail, setActiveDetail] = useState<ResponsibilityKey|null>(null);

    const getToggleClick = useCallback((detailId: ResponsibilityKey) => {
        return (event: React.MouseEvent<HTMLButtonElement|HTMLLIElement>) => {
            event.preventDefault();
            event.stopPropagation();

            setActiveDetail((current) => 
                current === detailId ? null : detailId
            );
        }
    }, []);

    const handleClose = useCallback(() => {
        setActiveDetail(null);
    }, []);

    const handleNext = useCallback(() => {
        setActiveDetail((current) => {
            const currentIndex = responsibilities.findIndex(({ key }) => key === current);

            if (currentIndex === -1 || currentIndex === responsibilities.length - 1) {
                return responsibilities[0].key;
            }

            return responsibilities[currentIndex + 1].key;
        })
    }, []);

    const handlePrev = useCallback(() => {
        setActiveDetail((current) => {
            const currentIndex = responsibilities.findIndex(({ key }) => key === current);

            if (currentIndex === -1) {
                return responsibilities[0].key;
            }

            if (currentIndex === 0) {
                return responsibilities[responsibilities.length - 1].key;
            }

            return responsibilities[currentIndex - 1].key;
        })
    }, []);

    return (
        <>
            <div className="px-10 xl_pl-24 lg_z-2">
                <div className="w-full title-h4 pb-3">Responsibilities</div>
                <ul>
                    {responsibilities.map(({ key, title }) => {
                        const isActive = activeDetail === key;
                        const clickHandler = getToggleClick(key);

                        return (
                            <li key={key} className={isActive ? classes.itemActive : classes.item} onClick={clickHandler}>
                                <Button
                                    onPress={getToggleClick(key)}
                                    priority="unset"
                                    additionalClasses={classes.toggleButton}
                                >
                                    <span className={isActive ? classes.toggleIconClose : classes.toggleIconOpen} />
                                </Button>
                                {title}
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className={activeDetail ? classes.detailsPanelOpen : classes.detailsPanel}>
                <div className={classes.curve} />
                <Button priority="unset" additionalClasses={classes.close} onPress={handleClose}>
                    <ArrowLeft width={32} height={32} />
                </Button>
                <div className={classes.detailsContentWrapper}>
                    {responsibilities.map(({ key, content, title }) => {
                        const isActive = activeDetail === key;

                        return (
                            <div key={key} className={isActive ? classes.detailsContentActive : classes.detailsContent}>
                                <h5 className="lg_hidden mb-3">{title}</h5>
                                {content}
                            </div>
                        )
                    })}
                    <div className={classes.navigation}>
                        <Button priority="unset" additionalClasses={classes.navigationAction} onPress={handlePrev}>
                            <ChevronLeft width={28} height={28} />
                        </Button>
                        <Button priority="unset" additionalClasses={classes.navigationAction} onPress={handleNext}>
                            <ChevronRight width={28} height={28} />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}