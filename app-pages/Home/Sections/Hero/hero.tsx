import SplineScene from '@/components/SplineScene';
import Anaglyph from '@/components/Anaglyph';

export default function Hero() {
    return (
        <>
            <div className="w-full relative min-h-screen rounded-bl-20 xl_rounded-bl-1/3 overflow-hidden">
                <SplineScene
                    className="w-full min-h-screen xl_min-h-none xl_aspect-4/3 pointer-events-none bg-black"
                    sceneUrl="https://prod.spline.design/V3aWT7tFTf9IuUM2/scene.splinecode"
                />
                <div className="absolute top-screen -translate-y-full left-0 px-10 w-full pb-10">
                    <Anaglyph component="h1" className="title-hero text-white">Web Developer</Anaglyph>
                </div>
            </div>
        </>
    )
}