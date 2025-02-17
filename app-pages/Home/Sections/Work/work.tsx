import contentful from '@/api/contentful';
import Anaglyph from '@/components/Anaglyph';
import ExternalLink from '@/icons/ExternalLink';
import Download from '@/icons/Download';
import Companies from './companies';
import Responsibilities from './responsibilities';
import classes from './work.module.css';

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
            <div className="bg-gray-100 w-full py-24 grid grid-cols-1 md_grid-cols-2 gap-x-8 gap-y-12 items-center justify-center relative">
                <div className="px-10 flex flex-col justify-center items-start md_items-end lg_z-1">
                    <div>
                        <Anaglyph component="div" className="title-h2 titleAnaglyph">Currently:</Anaglyph>
                        <div className="font-semibold text-lg text-left 2xl_text-center pr-1">Senior Practice Expertise Developer (Adobe) @ Valtech</div>
                    </div>
                </div>
                <Responsibilities />
            </div>
            <div className="pt-36 pb-16 w-full">
                <div className="w-full text-center px-10 font-header text-2xl font-black pb-8">Major Brands I've Worked With</div>
                <Companies />
            </div>
            <div className="w-full max-w-3xl mx-auto py-16 px-10 grid grid-cols-1 md_grid-cols-2 gap-8">
                <div className="w-full text-center px-10 font-header text-3xl font-black col-span-2">Links</div>
                <div className="w-full text-center">
                    <div className="relative max-w-max mx-auto">
                        <a
                            href="https://github.com/jconabree"
                            target="_blank"
                            className="button-primary py-3 px-8 text-lg block max-w-max"
                            title="Personal Github"
                        >
                            <span className="button-content">Github (Personal)</span>
                        </a>
                        <span className={classes.linkIcon}>
                            <ExternalLink width={16} height={16} />
                        </span>
                    </div>
                </div>
                <div className="w-full text-center">
                    <div className="relative max-w-max mx-auto">
                        <a
                            href="https://www.linkedin.com/in/justinconabree/"
                            target="_blank"
                            className="button-primary py-3 px-8 text-lg block max-w-max"
                            title="Work Github"
                        >
                            <span className="button-content">LinkedIn</span>
                        </a>
                        <span className={classes.linkIcon}>
                            <ExternalLink width={16} height={16} />
                        </span>
                    </div>
                </div>
                {resumeLink && (
                    <div className="w-full text-center">
                        <div className="relative max-w-max mx-auto">
                            <a
                                href={resumeLink}
                                target="_blank"
                                className="button-primary py-3 px-8 text-lg block max-w-max"
                            >
                                <span className="button-content">Resume</span>
                            </a>
                            <span className={classes.linkIcon}>
                                <Download width={16} height={16} />
                            </span>
                        </div>
                    </div>
                )}
                <div className="w-full text-center">
                    <div className="relative max-w-max mx-auto">
                        <a
                            href="https://github.com/justinconabree"
                            target="_blank"
                            className="button-primary py-3 px-8 text-lg block max-w-max"
                            title="Work Github"
                        >
                            <span className="button-content">Github (Work)</span>
                        </a>
                        <span className={classes.linkIcon}>
                            <ExternalLink width={16} height={16} />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}