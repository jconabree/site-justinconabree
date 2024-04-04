import contentful from '@/api/contentful';

import Marquee from '@/components/Marquee';
import AdobeLogo from '@/components/Logos/Adobe';
import HMLogo from '@/components/Logos/HM';
import NestleLogo from '@/components/Logos/Nestle';
import SailLogo from '@/components/Logos/Sail';
import StructubeLogo from '@/components/Logos/Structube';
import StokesLogo from '@/components/Logos/Stokes';

import { getAssetByFileNameQuery } from '@/graphql/assets.gql';

export default async function Work() {
    const { data } = await contentful.query({
        query: getAssetByFileNameQuery,
        variables: {
            filename: 'Justin_Conabree_Resume.pdf'
        }
    });
    const resumeLink = data.assetCollection?.items?.[0]?.url;

    return (
        <div className="h-full w-full">
            <div className="bg-gray-100 w-full py-24 flex flex-wrap items-center justify-center">
                <div className="w-full flex flex-wrap xl_max-w-1/2">
                    <div className="w-full md_w-1/2 px-10 flex flex-col justify-center">
                        <div className="title-h2 titleAnaglyph">Currently:</div>
                        <div className="font-bold pl-1">Valtech: Senior Practice Expertise Developer</div>
                    </div>
                    <div className="w-full md_w-1/2 px-10 xl_pl-24">
                        <div className="w-full text-xl font-bold mb-6">Responsabilities</div>
                        <ul>
                            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="py-16 w-full">
                <div className="w-full text-center px-10 font-header text-2xl font-black pb-8">Major Brands I've Worked With</div>
                <Marquee autoFill speed={100} gradient>
                    <span className="flex items-center px-16">
                        <NestleLogo className="h-auto" width={200} height={204.6} />
                    </span>
                    <span className="flex items-center px-16">
                        <AdobeLogo className="h-auto" width={350} height={111.66} />
                    </span>
                    <span className="flex items-center px-16">
                        <HMLogo height={100} />
                    </span>
                    <span className="flex items-center px-16">
                        <SailLogo height={100} />
                    </span>
                    <span className="flex items-center px-16">
                        <StructubeLogo width={350} />
                    </span>
                    <span className="flex items-center px-16">
                        <StokesLogo className="h-auto" width={300} height={89.5} />
                    </span>
                </Marquee>
            </div>
            <div className="flex flex-wrap w-full xl_max-w-2/3 mx-auto py-16 px-10">
                <div className="w-full sm_w-1/2 text-center py-16">
                    <a
                        href="https://github.com/jconabree"
                        target="_blank"
                        className="button-primary py-4 px-8 text-lg anchor"
                        title="Personal Github"
                    >
                        Github (P)
                    </a>
                </div>
                <div className="w-full sm_w-1/2 text-center py-16">
                    <a
                        href="https://github.com/justinconabree"
                        target="_blank"
                        className="button-primary py-4 px-8 text-lg anchor"
                        title="Work Github"
                    >
                        Github (W)
                    </a>
                </div>
                {resumeLink && (
                    <div className="w-full text-center py-16">
                        <a
                            href={resumeLink}
                            target="_blank"
                            className="button-primary py-4 px-8 text-lg anchor"
                        >
                            Resume
                        </a>
                    </div>
                )}
            </div>
        </div>
    )
}