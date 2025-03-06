'use client';

import { MouseEventHandler, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Button from '@/components/Button';
import CornerRightUpIcon from '@/icons/CornerRightUp';
import classes from './list.module.css';
import { area } from 'framer-motion/client';

interface TechSkill {
    title: string;
    activeCortex: 'left'|'right'|'both';
    skills: string[];
}

interface ListProps {
    skills: TechSkill[]
}

export default function List(props: ListProps) {
    const { skills } = props;
    const listRef = useRef<HTMLDivElement>(null);
    const [activeArea, setActiveArea] = useState<string>();
    const [loadingAnimation, setLoadingAnimation] = useState<boolean>();
    const [delayRender, setDelayRender] = useState<boolean>();

    useEffect(() => {
        setTimeout(() => {
            setDelayRender(false);
        }, 750);
        setTimeout(() => {
            document.querySelector('.responsibility-curve')?.classList.remove('anim-out');
        }, 1100);
        setTimeout(() => {
            setLoadingAnimation(false);
        }, 1650);
    }, [activeArea]);

    const activeSkills = useMemo<{skill: string; area: string}[]|null>(() => {
        if (!activeArea) {
            return null;
        }

        if (activeArea === 'all') {
            return skills.reduce((skillList: {skill: string; area: string}[], area: TechSkill) => {
                const lowercaseSkills = skillList.map(({ skill }) => skill.toLowerCase());

                area.skills.forEach((skill) => {
                    const lowercaseSkill = skill.toLowerCase();

                    if (!lowercaseSkills.includes(lowercaseSkill)) {
                        skillList.push({ skill, area: area.title });
                        lowercaseSkills.push(lowercaseSkill);
                    }
                });

                return skillList;
            }, []);
        }

        return skills.find((area) => area.title === activeArea)!.skills.map((skill) => ({
            skill,
            area: activeArea
        }));
    }, [activeArea]);

    const getFilterHandler = useCallback((type: string): MouseEventHandler<HTMLButtonElement> => {
        return () => {
            if (listRef.current) {
                const y = listRef.current.getBoundingClientRect().top + window.scrollY - 200;
                console.log(y)
                window.scrollTo({
                    top: y,
                    // behavior: 'smooth'
                });

                listRef.current.closest('.skills-container')?.classList.add('filters-applied')
            }
            document.querySelector('.responsibility-curve')?.classList.add('anim-out');
            setLoadingAnimation(true);
            setDelayRender(true);
            setActiveArea(type);
        }
    }, []);

    return (
        <div className="w-full relative h-full">
            <div className="py-6 px-10 sticky z-50 top-14 md_top-18 bg-black">
                <div className="w-full relative flex flex-wrap justify-center align-center gap-x-8 gap-y-3 -sm_grid -sm_grid-cols-2">
                    {skills.map((area) => {
                        const isActive = activeArea === area.title;

                        return (
                            <Button
                                priority="secondary"
                                key={area.title}
                                additionalClasses={isActive ? 'bg-white text-black' : 'bg-black'}
                                onPress={getFilterHandler(area.title)}
                                disabled={loadingAnimation || isActive}
                            >
                                {area.title}
                            </Button>
                        )
                    })}
                    <Button
                        priority="secondary"
                        additionalClasses={`-sm_col-span-2 ${activeArea === 'all' ? 'bg-white text-black' : 'bg-black'}`}
                        onPress={getFilterHandler('all')}
                        disabled={loadingAnimation || activeArea === 'all'}
                    >
                        View All
                    </Button>
                </div>
            </div>
            
            <div ref={listRef} className="w-full relative min-h-half xl_min-h-twoThirds">
                {!activeArea && (
                    <div className="flex w-max text-[1.5rem] leading-[1] items-baseline pt-4 gap-4 absolute left-1/2 top-0 -translate-x-1/2 md_-translate-x-full">
                        Select a filter <CornerRightUpIcon width={32} height={32} className={`inline ${classes.showArrow}`} />
                    </div>
                )}
                {loadingAnimation && (
                    <div className={classes.loadingOverlay} />
                )}
                {activeArea && activeSkills && (
                    <div className={`grid grid-cols-1 md_grid-cols-2 lg_grid-cols-3 gap-x-6 gap-y-4 pt-10 pb-16 px-10 3xl_max-w-2/3 mx-auto ${delayRender ? 'opacity-0' : 'opacity-100'}`}>
                        {activeSkills.map((skill) => {
                            const type = activeArea === 'all' ? skill.area : null;

                            return (
                                <div key={skill.skill} className="border-b py-2 flex justify-between">{skill.skill}{type && (<span className="text-xs">({type})</span>)}</div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}