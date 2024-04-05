"use client";

import Spline from '@splinetool/react-spline';

interface SplineSceneProps {
    sceneUrl: string;
    [key: string]: unknown;
}

export default function SplineScene(props: SplineSceneProps) {
  const { sceneUrl, ...rest } = props;

  return (
    <Spline
        {...rest}
        scene={sceneUrl}
    />
  );
}
