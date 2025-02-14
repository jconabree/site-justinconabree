'use client';

import React, { useEffect, useCallback, useRef, useState } from 'react';
import { useWaitForReady } from '../../hooks/useWaitForReady';

export interface ObservedContentProps {
    component: React.ElementType,
    margin?: string|{
        query: string;
        margin: string;
    }[]
}

interface ObservedContentInternalProps extends ObservedContentProps {
    onIntersect: (entries: IntersectionObserverEntry[]) => void;
}

export default function ObservedContent(props: ObservedContentInternalProps) {
    const { component: Component, onIntersect, margin, ...rest } = props;
    const element = useRef(null);
    const currentObserver = useRef<IntersectionObserver>(null);
    const { ready } = useWaitForReady();

    const bindObserver = useCallback((rootMargin: string) => {
        const observer = new IntersectionObserver(onIntersect, {
            rootMargin,
            threshold: Array.from({ length: 9 }).map((_, index) => index === 0 ? 0 : 1/8 * index)
        });

        const currentElement = element.current!;
        observer.observe(currentElement);

        return observer;
    }, [onIntersect]);

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
    }, [ready, bindObserver, margin]);

    return (
        <Component {...rest} ref={element} />
    );
}