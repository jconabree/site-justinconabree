import { useCallback, useRef } from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const useGsapProvider = () => {
    const getGsap = useCallback(() => {
        return gsap;
    }, []);

    const getTimeline = useCallback((...params) => {
        return gsap.timeline(...params);
    }, []);

    const getScrollTimeline = useCallback((...params) => {
        gsap.registerPlugin(ScrollTrigger);

        return gsap.timeline(...params);
    })

    return {
        getGsap,
        getTimeline,
        getScrollTimeline
    };
};