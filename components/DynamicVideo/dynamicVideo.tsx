"use client";

import { useEffect, useRef, useState, VideoHTMLAttributes } from 'react';

type VideoMediaSource = {
    query: '*'|string;
    src: string;
};

type DynamicVideoProps = VideoHTMLAttributes<HTMLVideoElement> & {
    defaultSrc?: string;
    mediaSources: VideoMediaSource[]
};

export default ({
    defaultSrc,
    mediaSources,
    ...videoProps
}: DynamicVideoProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [currentSrc, setCurrentSrc] = useState<string>();

    useEffect(() => {
        const mediaMatches = mediaSources.map((mediaEntry) => {
            return {
                match: window.matchMedia(mediaEntry.query),
                ...mediaEntry
            };
        });

        const findCurrentSource = () => {
            const currentMatch = mediaMatches.find(({ match }) => {
                return match.matches;
            });
    
            return currentMatch?.src ?? defaultSrc;
        };

        let delayedChangeTimeout: any;
        const triggerChange = (source: string) => {
            if (delayedChangeTimeout) {
                clearTimeout(delayedChangeTimeout);
            }

            delayedChangeTimeout = setTimeout(() => {
                setCurrentSrc(source);
                if (videoRef.current) {
                    videoRef.current.src = source;
                }
            }, 50);
        }

        const currentSource = findCurrentSource();
        setCurrentSrc(currentSource);

        mediaMatches.forEach((mediaMatch) => {
            mediaMatch.match.addEventListener('change', () => {
                const source = findCurrentSource();

                if (source) {
                    triggerChange(source);
                }
            })
        })

        return () => {
            if (delayedChangeTimeout) {
                clearTimeout(delayedChangeTimeout);
            }
        }
    }, []);

    if (!currentSrc) {
        return null;
    }

    return (
        <video {...videoProps} ref={videoRef} src={currentSrc} />
    );
}