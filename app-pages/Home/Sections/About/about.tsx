import Image from 'next/image';

import contentful from '@/api/contentful';
import Anaglyph from '@/components/Anaglyph';
import { getAssetByTitleQuery } from '@/graphql/assets.gql';
import { getImageSize } from '@/util/images';
    
import classes from './about.module.css';

export default async function About() {
    const { data } = await contentful.query({
        query: getAssetByTitleQuery,
        variables: {
            title: 'Me'
        }
    });
    const profilePicture = data.assetCollection?.items?.[0];
    const imageSize = profilePicture ? getImageSize(profilePicture.width, profilePicture.height, 1100) : null;

    return (
        <div className="h-full w-full flex flex-wrap items-center justify-center pb-36 pt-24">
            <div className="grid grid-cols-1 xl_grid-cols-2 gap-x-4 gap-y-12 justify-center items-center w-full px-10 2xl_px-24 py-20">
                <div className="w-full">
                    <div className="max-w-screen-md mx-auto rounded-3xl overflow-hidden">
                        {profilePicture && (
                            <Image
                                src={profilePicture.url}
                                width={imageSize!.width}
                                height={imageSize!.height}
                                sizes="(max-width: 1279px) 90vw, 30vw"
                                className="w-full"
                                alt="A portrait of me (Justin Conabree)"
                            />
                        )}
                    </div>
                </div>
                <div className="w-full">
                    <Anaglyph wide component="div" className="text-2xl sm_text-3xl lg_text-4.5xl 4xl_text-4.75xl mb-6 lg_mb-12 text-center xl_text-right font-header font-bold emphasis-secondary-wide leading-none">
                        Passionate about making cool $#!T
                    </Anaglyph>
                    <div className="text-lg text-center xl_text-right mt-6 xl_max-w-3xl xl_justify-self-end">
                        <p className="mb-3">A "maker" at heart, I enjoy building things. The conceptualising, problem solving, implementation, (more problem solving) and satisfaction when it's complete.</p>
                        <p>With code I get to do this every day for work and other personal projects, but I also enjoy <span className={classes.printingWrapper}>3D printing<span className={classes.printingMask}></span></span> and woodworking.</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap gap-4 max-w-7xl pt-16 px-10 items-center justify-center">
                <div className={classes.attributeItem}>Problem-Solving</div>
                <div className={classes.attributeItem}>Adaptability</div>
                <div className={classes.attributeItem}>Continuous Learning</div>
                <div className={classes.attributeItem}>Innovative Thinking</div>
                <div className={classes.attributeItem}>Proactive Mindset</div>
                <div className={classes.attributeItem}>Leadership & Coaching</div>
                <div className={classes.attributeItem}>Collaboration & Teamwork</div>
                <div className={classes.attributeItem}>Effective Communication</div>
                <div className={classes.attributeItem}>Agile Project Management</div>
                <div className={classes.attributeItem}>Cross-Functional Team Leadership</div>
                <div className={classes.attributeItem}>Stakeholder Engagement</div>
            </div>
        </div>
    );
}