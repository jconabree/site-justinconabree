'use client';

import { useCallback, useMemo } from 'react';
import ObservedContent, { ObservedContentProps } from '../ObservedContent';

interface AnaglyphProps extends ObservedContentProps {
    component: React.ElementType;
    wide?: boolean;
    disableScrollTopCheck?: boolean;
    [key: string]: unknown;
}

export default function Anaglyph(props: AnaglyphProps) {
    const { wide, disableScrollTopCheck, ...rest } = props;

    const getOnIntersect = useCallback((
        maximums = {
            offset: {
                wide: 8,
                base: 5
            },
            blur: 3
        }
    ): IntersectionObserverCallback => {
        return (entries: IntersectionObserverEntry[]) => {
            const isScrolledToTop = !disableScrollTopCheck && globalThis.scrollY <= 60;
            const maxOffset = isScrolledToTop ? 0 : wide ? maximums.offset.wide : maximums.offset.base;
            const maxBlur = isScrolledToTop ? 0 : maximums.blur;

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
        }
    }, [disableScrollTopCheck, wide]);

    const onIntersect = useMemo(() => {
        return getOnIntersect();
    }, [getOnIntersect]);

    const margins = useMemo(() => {
        return [{
            query: '(max-width: 768px)',
            margin: '-25% 0px -25% 0px',
            onIntersect: getOnIntersect({
                offset: {
                    base: 3,
                    wide: 5
                },
                blur: 2.5
            })
        }, {
            query: '(min-width: 769px)',
        }]
    }, [getOnIntersect]);

    return (
        <ObservedContent {...rest} margin={margins} onIntersect={onIntersect} />
    )
}