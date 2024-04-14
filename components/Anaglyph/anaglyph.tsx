'use client';

import { useEffect, useRef } from 'react';
import { useWaitForReady } from '../../hooks/useWaitForReady';

interface AnaglyphProps {
    component: React.ElementType;
    wide?: boolean;
    [key: string]: unknown;
}

export default function Anaglyph(props: AnaglyphProps) {
    const { component: Component, wide, ...rest } = props;
    const element = useRef(null);
    const { ready } = useWaitForReady();

    useEffect(() => {
        if (ready) {
            const observer = new IntersectionObserver((entries) => {
                const isScrolledToTop = globalThis.scrollY <= 60;
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
            }, {
                rootMargin: '-20% 0px -15% 0px', // TODO account for mobile vs desktop
                threshold: Array.from({ length: 9 }).map((_, index) => index === 0 ? 0 : 1/8 * index)
            });

            const currentElement = element.current!;
            observer.observe(currentElement);

            return () => {
                observer.unobserve(currentElement);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ready]);

    return (
        <Component {...rest} ref={element} />
    )
}