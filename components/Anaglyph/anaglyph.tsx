'use client';

import { useEffect, useCallback, useRef, useState } from 'react';
import { useWaitForReady } from '../../hooks/useWaitForReady';

interface AnaglyphProps {
    component: React.ElementType;
    wide?: boolean;
    disableScrollTopCheck?: boolean;
    margin?: string|{
        query: string;
        margin: string;
    }[]
    [key: string]: unknown;
}

export default function Anaglyph(props: AnaglyphProps) {
    const { component: Component, wide, margin, disableScrollTopCheck, ...rest } = props;
    const element = useRef(null);
    const currentObserver = useRef<IntersectionObserver>();
    const { ready } = useWaitForReady();

    const bindObserver = useCallback((rootMargin: string) => {
        const observer = new IntersectionObserver((entries) => {
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
        }, {
            rootMargin,
            threshold: Array.from({ length: 9 }).map((_, index) => index === 0 ? 0 : 1/8 * index)
        });

        const currentElement = element.current!;
        observer.observe(currentElement);

        return observer;
    }, [disableScrollTopCheck, wide]);

    useEffect(() => {
        if (ready) {
            const rootMargin = margin ?? '-20% 0px -15% 0px';

            if (typeof rootMargin === 'string') {
                const observer = bindObserver(rootMargin);

                return () => {
                    observer.disconnect();
                }
            }

            const handleMediaMatch = (marginValue: string) => {
                if (currentObserver.current instanceof IntersectionObserver) {
                    currentObserver.current.disconnect();
                }

                currentObserver.current = bindObserver(marginValue);
            }

            rootMargin?.map((marginEntry) => {
                const media = window.matchMedia(marginEntry.query);

                if (media.matches) {
                    handleMediaMatch(marginEntry.margin);
                }
                
                media.addEventListener('change', (match) => {
                    if (match.matches) {
                        handleMediaMatch(marginEntry.margin);
                    }
                });
            });

            return () => {
                if (currentObserver.current instanceof IntersectionObserver) {
                    currentObserver.current.disconnect();
                }
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ready]);

    return (
        <Component {...rest} ref={element} />
    )
}