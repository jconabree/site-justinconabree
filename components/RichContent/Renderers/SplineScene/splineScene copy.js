"use client";

import { useEffect, useRef, useState } from 'react';

import * as THREE from 'three';
import SplineLoader from '@splinetool/loader';

import { useGsapContext } from '@/providers/GsapProvider';
import { useWaitForReady } from '@/hooks/useWaitForReady';
import { getStateProperties } from '@/utils/spline';

import classes from './splineScene.module.css';

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
    const wrapper = useRef();
    const { ready } = useWaitForReady();
    const { getGsap } = useGsapContext();

    const [spline, setSpline] = useState();

    useEffect(() => {
        if (!ready || spline) {
            return;
        }
        // camera
        const camera = new THREE.OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2,  1, 1000);
        camera.position.set(0, 0, 400);
        camera.quaternion.setFromEuler(new THREE.Euler(0, 0, 0));

        // scene
        const scene = new THREE.Scene();

        // spline scene
        const loader = new SplineLoader();
        loader.load(
            sceneUrl,
            (splineScene) => {
                scene.add(splineScene);
            }
        );

        // renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setAnimationLoop(animate);
        wrapper.current.appendChild(renderer.domElement);

        // scene settings
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFShadowMap;

        renderer.setClearColor( 0x000000, 0 );
        renderer.setClearAlpha();

        // orbit controls
        // const controls = new OrbitControls(camera, renderer.domElement);
        // controls.enableDamping = true;
        // controls.dampingFactor = 0.125;

        window.addEventListener('resize', onWindowResize);
        function onWindowResize() {
            camera.left = window.innerWidth / - 2;
            camera.right = window.innerWidth / 2;
            camera.top = window.innerHeight / 2;
            camera.bottom = window.innerHeight / - 2;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        function animate(time) {
            // controls.update();
            renderer.render(scene, camera);
        }

        setSpline({
            scene,
            camera,
        })

    }, [ready]);

    // const { setSpline } = useSplineContext();
    useEffect(() => {
        if (!spline) {
            return;
        }

        console.log(spline);
        // const camera = spline._camera;
        // console.log('camera', camera);
        // const gsap = getGsap();

        // if (initialState) {
        //     initialState.splineObjectNames
        //         .map((name) => {
        //             const splineObject = spline.findObjectById(name);
        //             console.log('object', name, splineObject);

        //             return splineObject;
        //         })
        //         .filter(Boolean)
        //         .forEach((object) => {
        //             ['scale', 'position', 'rotation'].forEach((statePropertyName) => {
        //                 const stateValues = initialState.endState[statePropertyName];

        //                 if (!stateValues?.length) {
        //                     return;
        //                 }

        //                 // TODO figure out how to wait for element
        //                 // gsap.set(object[statePropertyName], getStateProperties(stateValues));
        //             })
        //         });
        // }

        // TODO register animations on gsap timeline
        // TODO figure out how to wait for element
    }, [spline]);

    return (
        <div ref={wrapper} />
    );
}

