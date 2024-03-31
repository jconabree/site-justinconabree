"use client";

import Spline from '@splinetool/react-spline';
import classes from './testSplineScene.module.css';
import { useSplineContext } from '@/providers/SplineProvider';

/**
 * Apple: https://prod.spline.design/Oitgjx9WD9UqAUb5/scene.splinecode
 * 
 * Test: https://prod.spline.design/kubTLaQ6p7QIILWs/scene.splinecode
 * 
 * Test 2: https://prod.spline.design/Lx5M4zqp7SByLRob/scene.splinecode
 * Test GSAP: https://prod.spline.design/1Objb8q4O-y34VW1/scene.splinecode
 */
export default function SplineScene() {
  const { setSpline } = useSplineContext();

  return (
    <Spline
        styles={null}
        className={classes.wrapper}
        scene="https://prod.spline.design/1Objb8q4O-y34VW1/scene.splinecode"
        onLoad={
          (spline) => {
            console.log(spline);
            setSpline(spline);
          }
        }
    />
  );
}

