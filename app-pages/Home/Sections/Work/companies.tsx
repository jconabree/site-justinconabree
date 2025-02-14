'use client';

import React, { forwardRef } from 'react';
import Marquee from '@/components/Marquee';
import AdobeLogo from '@/components/Logos/Adobe';
import HMLogo from '@/components/Logos/HM';
import NestleLogo from '@/components/Logos/Nestle';
import SailLogo from '@/components/Logos/Sail';
import StructubeLogo from '@/components/Logos/Structube';
import StokesLogo from '@/components/Logos/Stokes';
import ObservedContent from '@/components/ObservedContent';

import classes from './companies.module.css'


export default function Companies() {
    return (
        <ObservedContent
            onIntersect={(entries) => {
                entries.forEach((entry) => {
                    (entry.target as HTMLElement).style.setProperty(
                        '--grayscale-ratio',
                        `${(1 - entry.intersectionRatio)}`
                    );
                });
            }}
            component={({ ref }: { ref: React.RefObject<HTMLDivElement> }) => {
                return (
                    <div ref={ref} className={classes.root}>
                        <Marquee autoFill speed={100} gradient>
                            <span className="flex items-center px-16">
                                <NestleLogo className="h-auto" width={200} height={204.6} />
                            </span>
                            <span className="flex items-center px-16">
                                <AdobeLogo className="h-auto" width={350} height={111.66} />
                            </span>
                            <span className="flex items-center px-16">
                                <HMLogo height={100} />
                            </span>
                            <span className="flex items-center px-16">
                                <SailLogo height={100} />
                            </span>
                            <span className="flex items-center px-16">
                                <StructubeLogo width={350} />
                            </span>
                            <span className="flex items-center px-16">
                                <StokesLogo className="h-auto" width={300} height={89.5} />
                            </span>
                        </Marquee>
                    </div>
                );
            }}
        />
    )
}