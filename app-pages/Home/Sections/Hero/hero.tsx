import SplineScene from '@/components/SplineScene';
import Anaglyph from '@/components/Anaglyph';

export default function Hero() {
    return (
        <>
            <div className="w-full relative min-h-screen rounded-bl-1/3 overflow-hidden">
                {/* <SplineScene
                    className="w-full h-full absolute top-0 left-0 pointer-events-none invert"
                    sceneUrl="https://prod.spline.design/AA5ONnXvd6OhYbe7/scene.splinecode"
                /> */}
                <SplineScene
                    className="w-full aspect-4/3 pointer-events-none"
                    sceneUrl="https://prod.spline.design/V3aWT7tFTf9IuUM2/scene.splinecode"
                />
                <div className="absolute top-screen -translate-y-full left-0 px-10 max-w-1/2 pb-10">
                    <Anaglyph component="h1" className="title-hero text-white">Web Developer</Anaglyph>
                </div>
            </div>
        </>
    )
}