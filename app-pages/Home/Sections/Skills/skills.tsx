import contentful from '@/api/contentful';
import Anaglyph from '@/components/Anaglyph';
import { getSkillAreasQuery } from '@/graphql/skills.gql';

import List from './list';

export default async function Skills() {
    const { data } = await contentful.query({
        query: getSkillAreasQuery
    });

    const skills = data?.techSkillAreaCollection?.items;
    return (
        <div className="h-full w-full relative min-h-screen pt-48 rounded-tr-20 xl_rounded-tr-1/3 bg-black text-white">
            <div className="px-10">
                <Anaglyph component="div" className="title-h1 leading-none">Languages && Technology</Anaglyph>
                <p className="py-10">Languages, frameworks and technology that I've worked with</p>
            </div>
            <List skills={skills} />
        </div>
    )
}