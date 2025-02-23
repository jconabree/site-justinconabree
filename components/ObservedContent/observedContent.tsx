'use client';

import React, { useEffect, useCallback, useRef, useState } from 'react';
import { useWaitForReady } from '../../hooks/useWaitForReady';

export interface ObservedContentProps {
    component: React.ElementType,
    margin?: string|{
        query: string;
        margin?: string;
        onIntersect?: IntersectionObserverCallback;
    }[]
}

interface ObservedContentInternalProps extends ObservedContentProps {
    onIntersect: IntersectionObserverCallback;
}

export default function ObservedContent(props: ObservedContentInternalProps) {
    const { component: Component, onIntersect, margin, ...rest } = props;
    const element = useRef(null);
    const currentObserver = useRef<IntersectionObserver>(null);
    const { ready } = useWaitForReady();

    const bindObserver = useCallback((rootMargin: string, intersectFunction: IntersectionObserverCallback) => {
        const observer = new IntersectionObserver(intersectFunction, {
            rootMargin,
            threshold: Array.from({ length: 9 }).map((_, index) => index === 0 ? 0 : 1/8 * index)
        });

        const currentElement = element.current!;
        observer.observe(currentElement);

        return observer;
    }, []);

    useEffect(() => {
        if (ready) {
            const baseMargin = '-20% 0px -15% 0px';
            const rootMargin = margin ?? baseMargin;

            if (typeof rootMargin === 'string') {
                const observer = bindObserver(rootMargin, onIntersect);

                return () => {
                    observer.disconnect();
                }
            }

            const handleMediaMatch = (marginValue: string, marginIntersectFunction: IntersectionObserverCallback) => {
                if (currentObserver.current instanceof IntersectionObserver) {
                    currentObserver.current.disconnect();
                }

                currentObserver.current = bindObserver(marginValue, marginIntersectFunction);
            }

            rootMargin?.map((marginEntry) => {
                const media = window.matchMedia(marginEntry.query);

                if (media.matches) {
                    handleMediaMatch(
                        marginEntry.margin ?? baseMargin,
                        marginEntry.onIntersect ?? onIntersect
                    ); 
                }
                
                media.addEventListener('change', (match) => {
                    if (match.matches) {
                        handleMediaMatch(
                            marginEntry.margin ?? baseMargin,
                            marginEntry.onIntersect ?? onIntersect
                        );
                    }
                });
            });

            return () => {
                if (currentObserver.current instanceof IntersectionObserver) {
                    currentObserver.current.disconnect();
                }
            };
        }
    }, [ready, bindObserver, onIntersect, margin]);

    return (
        <Component {...rest} ref={element} />
    );
}