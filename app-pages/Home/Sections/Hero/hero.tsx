import SplineScene from '@/components/SplineScene';
import Anaglyph from '@/components/Anaglyph';

export default function Hero() {
    return (
        <>
            <div className="h-full w-full relative min-h-screen">
                {/* <SplineScene
                    className="w-full h-full absolute top-0 left-0 pointer-events-none invert"
                    sceneUrl="https://prod.spline.design/AA5ONnXvd6OhYbe7/scene.splinecode"
                /> */}
                <SplineScene
                    className="w-full h-full absolute top-0 left-0 pointer-events-none imageAnaglyph"
                    // sceneUrl="https://prod.spline.design/AA5ONnXvd6OhYbe7/scene.splinecode"
                    sceneUrl="https://prod.spline.design/utRpStjlmF0I13Nq/scene.splinecode"
                />
                <div className="absolute bottom-0 left-0 px-10 max-w-1/2 pb-10">
                    <Anaglyph component="h1" className="title-hero">Web Developer</Anaglyph>
                </div>
            </div>
            <p className="px-10 text-lg mt-16">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem maxime modi officia, vel velit nam totam quibusdam.</p>
            <p className="px-10 text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem maxime modi officia, vel velit nam totam quibusdam.</p>
            <p className="px-10 text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem maxime modi officia, vel velit nam totam quibusdam.</p>
        </>
    )
}