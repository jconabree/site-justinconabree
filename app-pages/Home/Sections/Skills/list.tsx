'use client';

import { useEffect, useState } from 'react';
import { Application as SplineApplication } from '@splinetool/runtime';
import SplineScene from '@/components/SplineScene';
import Button from '@/components/Button';

enum CortexTypes {
    left = 'left',
    right = 'right'
}

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
    const [activeArea, setActiveArea] = useState<TechSkill>();

    const infoPanelPosition = !activeArea || activeArea.activeCortex === 'both' ?
        'lg_left-0 lg_w-full lg_h-half' :
        activeArea.activeCortex === CortexTypes.right ? 'lg_left-full lg_-translate-x-full lg_w-1/2 2xl_w-1/3 lg_h-full' :
        'lg_left-0 lg_w-1/2 2xl_w-1/3 lg_h-full';

    return (
        <>
            <div className="py-2 px-10 -lg_sticky -lg_z-50 top-14 md_top-20 lg_top-auto">
                <div className="w-full relative flex flex-wrap justify-center align-center gap-x-8 gap-y-3">
                    {skills.map((area) => {
                        return (
                            <Button
                                priority="secondary"
                                key={area.title}
                                additionalClasses={activeArea?.title === area.title ? 'bg-white text-black' : ''}
                                onPress={() => {
                                    setActiveArea(area);
                                }}
                            >
                                {area.title}
                            </Button>
                        )
                    })}
                </div>
            </div>
            
            <div className="w-full relative min-h-screen">
                {activeArea && (
                    <div className={`flex flex-wrap items-center content-center justify-center gap-x-6 gap-y-4 transition-all duration-300 pt-16 pb-4 px-10 lg_absolute lg_z-20 lg_top-0 ${infoPanelPosition}`}>
                        {activeArea.skills.map((skill) => {
                            return (
                                <div key={skill} className="pill py-2">{skill}</div>
                            )
                        })}
                    </div>
                )}
            </div>
        </>
    )
}