"use client";

import { useEffect, useState } from 'react';

import { useGsapContext } from '@/providers/GsapProvider';

export default () => {
    const [spline, setSpline] = useState();
    const { getGsap, getTimeline, getScrollTimeline } = useGsapContext();



    useEffect(() => {
        if (!spline) {
            return;
        }

        const mainObj = spline.findObjectByName('MainObj');
        console.log(spline.getAllObjects());

        if (!mainObj) {
            return;
        }

        const gsap = getGsap();
        console.log('mainObj', mainObj);

        const objectSize = 150;

        gsap.set(mainObj.scale, { x: 4, y: 4, z: 4 });
        gsap.set(mainObj.position, { x: 180, y: 60, z: -1000 });
        gsap.set(mainObj.rotation, { x: 0, y: 0, z: -54.47 });

        const mainTimeline = getTimeline();

        const section1Tl = getScrollTimeline({
            scrollTrigger: {
                immediateRender: false,
                trigger: '#section1',
                start: 'top top',
                end: '+=600',
                scrub: true,
            },
        });
        
        const circleElement = document.querySelector('#circle');
        const circleLeft = circleElement.getBoundingClientRect().x - (window.innerWidth/2)

        const section2Scale = 3

        section1Tl.to(
            mainObj.position,
            {
                duration: 1,
                x: circleLeft + objectSize * section2Scale / 2 * 0.9,
                y: 0
            },
            0
        )
        .to(
            mainObj.scale,
            {
                duration: 1,
                x: section2Scale,
                y: section2Scale,
                z: section2Scale,
            },
            0
        )
        .to(
            mainObj.rotation,
            {
                duration: 1,
                x: 3.14159,
                y: 3.14159
            },
            0
        );

        const section2Tl = getScrollTimeline({
            scrollTrigger: {
                immediateRender: false,
                trigger: '#section2',
                start: 'top -200px',
                end: '+=600',
                scrub: true,
            },
        });
        

        const section3Scale = 6;
        const section2ObjectDimension = objectSize * section3Scale;
        section2Tl.to(
            mainObj.position,
            {
                duration: 1,
                x: (-window.innerWidth/2) + (section2ObjectDimension / 1.2),
                y: (-window.innerHeight/2) + (section2ObjectDimension / 2),
            },
            0.2
        )
        .to(
            mainObj.scale,
            {
                duration: 1,
                x: section3Scale,
                y: section3Scale,
                z: section3Scale,
            },
            0
        )
        .to(
            mainObj.rotation,
            {
                duration: 1,
                x: 0,
                y: 0
            },
            0
        );

        mainTimeline.add(section2Tl);

        const section3Tl = getScrollTimeline({
            scrollTrigger: {
                immediateRender: false,
                trigger: '#section3',
                start: 'top -200px',
                end: '+=300',
                scrub: true,
            },
        });

        const section4Scale = 6;
        const section3ObjectDimension = objectSize * section4Scale;
        section3Tl.to(
            mainObj.position,
            {
                duration: 1,
                x: (window.innerWidth/2) - (section3ObjectDimension / 1.2),
                y: (-window.innerHeight/2) + (section3ObjectDimension / 2),
            },
            0.2
        )
        .to(
            mainObj.rotation,
            {
                duration: 1,
                x: 3.14159,
                y: 3.14159
            },
            0
        );

        mainTimeline.add(section3Tl);
    }, [spline]);

    return {
        spline,
        setSpline
    };
}