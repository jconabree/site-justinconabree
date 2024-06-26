import contentful from '@/api/contentful';

import Anaglyph from '@/components/Anaglyph';
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
            <div className="bg-gray-100 w-full py-24 grid grid-cols-1 md_grid-cols-2 gap-x-8 gap-y-12 items-center justify-center">
                <div className="px-10 flex flex-col justify-center items-start md_items-end">
                    <div>
                        <Anaglyph component="div" className="title-h2 titleAnaglyph">Currently:</Anaglyph>
                        <div className="font-semibold text-lg text-center pr-1">Senior Practice Expertise Developer (Adobe) @ Valtech</div>
                    </div>
                </div>
                <div className="px-10 xl_pl-24">
                    <div className="w-full title-h4 pb-3">Responsabilities</div>
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
            <div className="pt-36 pb-16 w-full">
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
            <div className="w-full text-center px-10 font-header text-2xl font-black">Links</div>
                <div className="w-full sm_w-1/2 text-center py-16">
                    <a
                        href="https://github.com/jconabree"
                        target="_blank"
                        className="button-primary py-3 px-8 text-lg anchor-clear"
                        title="Personal Github"
                    >
                        Github (P)
                    </a>
                </div>
                <div className="w-full sm_w-1/2 text-center py-16">
                    <a
                        href="https://github.com/justinconabree"
                        target="_blank"
                        className="button-primary py-3 px-8 text-lg anchor-clear"
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
                            className="button-primary py-3 px-8 text-lg anchor-clear"
                        >
                            Resume
                        </a>
                    </div>
                )}
            </div>
        </div>
    )
}