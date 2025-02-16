import Image from 'next/image';

import contentful from '@/api/contentful';
import Anaglyph from '@/components/Anaglyph';
import { getAssetByTitleQuery } from '@/graphql/assets.gql';
    
import classes from './about.module.css';

export default async function About() {
    const { data } = await contentful.query({
        query: getAssetByTitleQuery,
        variables: {
            title: 'Me'
        }
    });
    const profilePicture = data.assetCollection?.items?.[0]?.url;

    return (
        <div className="h-full w-full flex flex-wrap items-center justify-center pt-36 pb-24">
            <div className="flex flex-wrap gap-4 max-w-7xl px-10 items-center justify-center">
                <div className={classes.attributeItem}>Problem Solving</div>
                <div className={classes.attributeItem}>Highly Adaptive</div>
                <div className={classes.attributeItem}>Constantly Learning</div>
                <div className={classes.attributeItem}>Product Innovation</div>
                <div className={classes.attributeItem}>Proactive</div>
                <div className={classes.attributeItem}>Coding Standards</div>
                <div className={classes.attributeItem}>Process Implementation</div>
                <div className={classes.attributeItem}>Performance Analysis</div>
                <div className={classes.attributeItem}>Code Optimization</div>
                <div className={classes.attributeItem}>Team Player</div>
                <div className={classes.attributeItem}>Leader and Coach</div>
                <div className={classes.attributeItem}>Agile Project Management</div>
                <div className={classes.attributeItem}>Cross Functional Team Management</div>
                <div className={classes.attributeItem}>Stakeholder Communications</div>
            </div>
            <div className="grid grid-cols-1 xl_grid-cols-2 gap-x-4 gap-y-12 justify-center items-center w-full px-10 2xl_px-24 py-20">
                <div className="w-full">
                    <div className="max-w-screen-md mx-auto rounded-3xl overflow-hidden">
                        <Image src={profilePicture} width={869} height={1405} className="w-full" alt="A portrait of me (Justin Conabree)" />
                    </div>
                </div>
                <div className="w-full">
                    <Anaglyph wide component="div" className="text-2xl sm_text-3xl lg_text-4.5xl 4xl_text-4.75xl mb-6 lg_mb-12 text-center xl_text-right font-header font-bold emphasis-secondary-wide leading-none">
                        Passionate about making cool $#!T
                    </Anaglyph>
                    <div className="text-lg text-center xl_text-right mt-6 xl_max-w-3xl xl_justify-self-end">
                        <p className="mb-3">A "maker" at heart, I enjoy building things. The conceptualising, problem solving, implementation, (more problem solving) and satisfaction when it's complete.</p>
                        <p>With coding I get to do that every day for work and other personal projects, but I also enjoy <span className={classes.printingWrapper}>3D printing<span className={classes.printingMask}></span></span> and woodworking.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}