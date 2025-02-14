'use client';

import { useEffect, useCallback, useRef, useState } from 'react';
import { useWaitForReady } from '../../hooks/useWaitForReady';
import ObservedContent, { ObservedContentProps } from '../ObservedContent';

interface AnaglyphProps extends ObservedContentProps {
    component: React.ElementType;
    wide?: boolean;
    disableScrollTopCheck?: boolean;
    [key: string]: unknown;
}

export default function Anaglyph(props: AnaglyphProps) {
    const { wide, margin, disableScrollTopCheck, ...rest } = props;

    const onIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
        const isScrolledToTop = !disableScrollTopCheck && globalThis.scrollY <= 60;
        const maxOffset = isScrolledToTop ? 0 : wide ? 8 : 5;
        const maxBlur = isScrolledToTop ? 0 : 3;

        entries.forEach((entry) => {
            Object.entries({
                '--tw-anaglyph-text-ofx1': -1,
                '--tw-anaglyph-text-ofy1': -.8,
                '--tw-anaglyph-text-ofx2': 1,
                '--tw-anaglyph-text-ofy2': .8
            }).forEach(([textProp, modifier]) => {
                (entry.target as HTMLElement).style.setProperty(
                    textProp,
                    `${(1 - entry.intersectionRatio) * maxOffset * modifier }px`
                );
            });

            Object.entries({
                '--tw-anaglyph-text-blur': .6,
                '--tw-anaglyph-shadow-blur': 1
            }).forEach(([shadowProp, modifier]) => {
                (entry.target as HTMLElement).style.setProperty(
                    shadowProp,
                    `${(1 - entry.intersectionRatio) * maxBlur * modifier }px`
                );
            });
        });
    }, [disableScrollTopCheck, wide]);

    return (
        <ObservedContent {...rest} onIntersect={onIntersect} />
    )
}