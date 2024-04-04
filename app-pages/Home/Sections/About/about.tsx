import Image from 'next/image';

import contentful from '@/api/contentful';
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
        <div className="h-full w-full flex flex-wrap items-center justify-center py-24">
            <div className="flex flex-wrap gap-4 max-w-7xl px-10 items-center justify-center">
                <div className={classes.attributeItem}>Full-stack Developer</div>
                <div className={classes.attributeItem}>Problem Solver</div>
                <div className={classes.attributeItem}>Highly Adaptive</div>
                <div className={classes.attributeItem}>Constantly Learning</div>
                <div className={classes.attributeItem}>Product Innovation</div>
                <div className={classes.attributeItem}>Proactive</div>
                <div className={classes.attributeItem}>Coding Standards</div>
                <div className={classes.attributeItem}>Process Implementation</div>
                <div className={classes.attributeItem}>Performance Analysis</div>
                <div className={classes.attributeItem}>Code Optimization</div>
                <div className={classes.attributeItem}>Team Player</div>
                <div className={classes.attributeItem}>Leadership</div>
                <div className={classes.attributeItem}>Agile Project Management</div>
                <div className={classes.attributeItem}>Cross Functional Team Management</div>
                <div className={classes.attributeItem}>Stakeholder Communications</div>
            </div>
            <div className="flex flex-wrap justify-center items-center w-full px-10 py-20">
                <div className="w-full lg_w-1/2">
                    <div className="imageAnaglyphWrapper max-w-full">
                        <Image src={profilePicture} width={869} height={1405} className="imageAnaglyph w-full" alt="A portrait of me (Justin Conabree)" />
                    </div>
                </div>
                <div className="w-full lg_w-1/3">
                    <div className="text-2xl md_text-6xl text-right font-header font-bold emphasis-secondary-wide leading-none">Some Cool Tag Line About Me</div>
                    <div className="text-lg text-right mt-6">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint, quidem! Delectus alias reiciendis esse accusamus sed ad, voluptates nesciunt voluptate cupiditate quibusdam fugit ea totam optio, assumenda distinctio obcaecati amet?</div>
                </div>
            </div>
        </div>
    );
}