"use client";

import * as THREE from 'three';
import { useEffect, useState } from 'react';

import Spline from '@splinetool/react-spline';

import { useGsapContext } from '@/providers/GsapProvider';
import { getStateProperties } from '@/utils/spline';

import classes from './splineScene.module.css';
// import { useSplineContext } from '@/providers/SplineProvider';

/**
 * Apple: https://prod.spline.design/Oitgjx9WD9UqAUb5/scene.splinecode
 * 
 * Test: https://prod.spline.design/kubTLaQ6p7QIILWs/scene.splinecode
 * 
 * Test 2: https://prod.spline.design/Lx5M4zqp7SByLRob/scene.splinecode
 * Test GSAP: https://prod.spline.design/1Objb8q4O-y34VW1/scene.splinecode
 */
export default function SplineScene(props) {
    const {
        internalName,
        sceneUrl,
        position,
        hideOnMobile,
        initialState,
        animationsCollection
    } = props;
    const { getGsap } = useGsapContext();

    const [spline, setSpline] = useState();

    // const { setSpline } = useSplineContext();
    useEffect(() => {
        if (!spline) {
            return;
        }

        console.log(spline);
        const camera = spline._camera;
        console.log('camera', camera);
        const gsap = getGsap();

        if (initialState) {
            initialState.splineObjectNames
                .map((name) => {
                    const splineObject = spline.findObjectById(name);
                    console.log('object', name, splineObject);
                    // splineObject.position = new THREE.Vector3(200, 0, 0);

                    return splineObject;
                })
                .filter(Boolean)
                .forEach((object) => {
                    ['scale', 'position', 'rotation'].forEach((statePropertyName) => {
                        const stateValues = initialState.endState[statePropertyName];

                        if (!stateValues?.length) {
                            return;
                        }

                        
                        // TODO figure out how to wait for element
                        // gsap.set(object[statePropertyName], getStateProperties(stateValues));
                    })
                });
        }

        // spline.renderMode = 'manual';
        // spline.requestRender();
        
        // TODO register animations on gsap timeline
        // TODO figure out how to wait for element
    }, [spline])

    return (
        <Spline
            styles={null}
            className={classes.wrapper}
            scene={sceneUrl}
            renderOnDemand={false}
            onLoad={(loadedSpline) => {
                if (!loadedSpline.disposed) {
                    setSpline(loadedSpline);
                }
            }}
        />
    );
}

