import Anaglyph from '@/components/Anaglyph';
import DynamicVideo from '@/components/DynamicVideo';

export default function Hero() {
    return (
        <>
            <div className="w-full relative min-h-screen">
                <DynamicVideo
                    autoPlay
                    loop
                    muted
                    playsInline
                    mediaSources={[{
                        src: '/media/totality.mp4',
                        query: 'all and (min-width: 1024px)'
                    }, {
                        src: '/media/totality_mobile.mp4',
                        query: 'all and (max-width: 1023px)'
                    }]}
                    className="object-cover absolute w-full h-full left-0 top-0 rounded-bl-20 xl_rounded-bl-1/3 overflow-hidden"
                />
                <div className="absolute top-[85vh] md_top-screen -translate-y-1/2 md_-translate-y-full left-0 px-10 w-full pb-10">
                    <Anaglyph
                        component="h1"
                        className="title-hero text-white text-dmax"
                        disableScrollTopCheck
                    >
                        Full-Stack Developer
                    </Anaglyph>
                </div>
            </div>
        </>
    )
}