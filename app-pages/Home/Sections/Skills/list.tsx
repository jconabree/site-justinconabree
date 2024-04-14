'use client';

import { useEffect, useMemo, useState } from 'react';
import Button from '@/components/Button';
import CornerRightUpIcon from '@/icons/CornerRightUp';
import classes from './list.module.css';

interface TechSkill {
    title: string;
    type: 'backend'|'frontend'|'devops'|'misc';
    activeCortex: 'left'|'right'|'both';
    skills: string[];
}

interface ListProps {
    skills: TechSkill[]
}

export default function List(props: ListProps) {
    const { skills } = props;
    const [activeArea, setActiveArea] = useState<string>();
    const [loadingAnimation, setLoadingAnimation] = useState<boolean>();
    const [delayRender, setDelayRender] = useState<boolean>();

    useEffect(() => {
        setTimeout(() => {
            setDelayRender(false);
        }, 1000);
        setTimeout(() => {
            setLoadingAnimation(false);
        }, 2100);
    }, [activeArea]);

    const activeSkills = useMemo<string[]|null>(() => {
        if (!activeArea) {
            return null;
        }

        if (activeArea === 'all') {
            return skills.reduce((skillList: string[], area: TechSkill) => {
                area.skills.forEach((skill) => {
                    if (!skillList.includes(skill)) {
                        skillList.push(skill);
                    }
                });

                return skillList;
            }, []);
        }

        return skills.find((area) => area.title === activeArea)!.skills;
    }, [activeArea])

    return (
        <>
            <div className="py-6 px-10 -lg_sticky -lg_z-50 top-14 md_top-20 lg_top-auto">
                <div className="w-full relative flex flex-wrap justify-center align-center gap-x-8 gap-y-3">
                    {skills.map((area) => {
                        return (
                            <Button
                                priority="secondary"
                                key={area.title}
                                additionalClasses={activeArea === area.title ? 'bg-white text-black' : ''}
                                onPress={() => {
                                    setLoadingAnimation(true);
                                    setDelayRender(true);
                                    setActiveArea(area.title);
                                }}
                                disabled={loadingAnimation || activeArea === area.title}
                            >
                                {area.title}
                            </Button>
                        )
                    })}
                    <Button
                        priority="secondary"
                        additionalClasses={activeArea === 'all' ? 'bg-white text-black' : ''}
                        onPress={() => {
                            setLoadingAnimation(true);
                            setDelayRender(true);
                            setActiveArea('all');
                        }}
                        disabled={loadingAnimation || activeArea === 'all'}
                    >
                        View All
                    </Button>
                </div>
            </div>
            
            <div className="w-full relative min-h-screen">
                {!activeArea && (
                    <div className="flex text-2xl items-end justify-start pl-80 pt-16 gap-4">
                        Select a filter <CornerRightUpIcon width={80} height={80} className={`inline ${classes.showArrow}`} />
                    </div>
                )}
                {loadingAnimation && (
                    <div className={classes.loadingOverlay} />
                )}
                {!delayRender && activeArea && activeSkills && (
                    <div className={`grid grid-cols-1 md_grid-cols-${Math.min(2, activeSkills.length)} lg_grid-cols-${Math.min(4, activeSkills.length)} gap-x-6 gap-y-4 pt-10 pb-4 px-10 3xl_max-w-2/3 mx-auto`}>
                        {activeSkills.map((skill) => {
                            return (
                                <div key={skill} className="border-b py-2">{skill}</div>
                            )
                        })}
                    </div>
                )}
            </div>
        </>
    )
}