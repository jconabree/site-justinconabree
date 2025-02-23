import contentful from '@/api/contentful';
import Anaglyph from '@/components/Anaglyph';
import { getSkillAreasQuery } from '@/graphql/skills.gql';

import List from './list';
import classes from './skills.module.css';

export default async function Skills() {
    const { data } = await contentful.query({
        query: getSkillAreasQuery
    });

    const skills = data?.techSkillAreaCollection?.items;
    return (
        <div className={`${classes.root} h-full w-full relative min-h-screen pt-48 rounded-tr-60 xl_rounded-tr-1/3 bg-black text-white`}>
            <div className="px-10 max-w-[80%]">
                <Anaglyph component="div" className="title-h1 leading-none">Languages && Tech && Skills</Anaglyph>
                <p className="py-10">Languages, frameworks and technology that I've worked with and the skills I've picked up along the way.</p>
            </div>
            <List skills={skills} />
        </div>
    )
}