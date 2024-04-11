import Button from '@/components/Button';

export default function StyleGuide() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between py-24 px-10 xl_px-24">
        <div className="py-24 px-10">
            <div className="text-3xl font-semibold mb-12">Style Guide</div>
            <div className="py-12">
                <div className="text-xl font-semibold mb-12">Typography</div>
                <div className="space-y-8">
                    <div className="flex-grow w-full">
                        <div className="font-semibold text-sm">Body</div>
                        <div>The quick brown fox jumps over the lazy dog</div>
                    </div>
                    <div className="flex-grow w-full">
                        <div className="font-semibold text-sm">Body emphasis</div>
                        <div>The quick <span className="emphasis">brown fox</span> jumps over the lazy dog</div>
                    </div>
                    <div className="flex-grow w-full">
                        <div className="font-semibold text-sm">Body wide emphasis</div>
                        <div>The quick <span className="emphasis-wide">brown fox</span> jumps over the lazy dog</div>
                    </div>
                    <div className="flex-grow w-full">
                        <div className="font-semibold text-sm">Body emphasis secondary</div>
                        <div>The quick <span className="emphasis-secondary">brown fox</span> jumps over the lazy dog</div>
                    </div>
                    <div className="flex-grow w-full">
                        <div className="font-semibold text-sm">Body emphasis wide secondary</div>
                        <div>The quick <span className="emphasis-secondary-wide">brown fox</span> jumps over the lazy dog</div>
                    </div>
                    <div className="flex-grow w-full">
                        <div className="font-semibold text-sm">Hero</div>
                        <div className="title-hero">The quick brown fox jumps over the lazy dog</div>
                    </div>
                    {Array.from({ length: 5 }).map((_, index) => {
                        const hNum = index + 1;

                        return (
                            <div className="flex-grow w-full" key={hNum}>
                                <div className="font-semibold text-sm">{`H${hNum}`}</div>
                                <div className={`title-h${hNum}`}>The quick brown fox jumps over the lazy dog</div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="py-12">
                <div className="text-xl font-semibold mb-12">Buttons and Links</div>
                <div className="space-y-8">
                    <div className="flex-grow w-full">
                        <div className="font-semibold text-sm mb-3">Primary</div>
                        <div><Button>Click Me</Button></div>
                    </div>
                    <div className="flex-grow w-full">
                        <div className="font-semibold text-sm mb-3">Secondary</div>
                        <div><Button priority="secondary">Click Me</Button></div>
                    </div>
                    <div className="flex-grow w-full">
                        <div className="font-semibold text-sm mb-3">Tertiary</div>
                        <div><Button priority="tertiary">Click Me</Button></div>
                    </div>
                    <div className="flex-grow w-full">
                        <div className="font-semibold text-sm mb-3">Danger</div>
                        <div><Button priority="danger">Click Me</Button></div>
                    </div>
                    <div className="flex-grow w-full">
                        <div className="font-semibold text-sm mb-3">Link</div>
                        <div>The quick brown fox <span className="anchor">jumps</span> over the lazy dog</div>
                    </div>
                </div>
            </div>
            <div className="py-12">
                <div className="text-xl font-semibold mb-12">Forms</div>
            </div>
        </div>
        </main>
    )
}