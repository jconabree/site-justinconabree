import contentful from '@/api/contentful';
import { getSkillAreasQuery } from '@/graphql/skills.gql';

import List from './list';

export default async function Skills() {
    const { data } = await contentful.query({
        query: getSkillAreasQuery
    });

    const skills = data?.techSkillAreaCollection?.items;
    return (
        <div className="h-full w-full relative min-h-screen">
            <div className="px-10">
                <div className="title-h1 leading-none">Languages && Technology</div>
                <p className="py-10">Languages, frameworks and technology that I've worked with</p>
            </div>
            <List skills={skills} />
        </div>
    )
}