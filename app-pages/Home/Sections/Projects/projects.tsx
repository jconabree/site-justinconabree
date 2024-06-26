import Link from "next/link";
import contentful from '@/api/contentful';
import { getFeaturedPortfolioQuery } from '@/graphql/portfolio.gql';
import Anaglyph from '@/components/Anaglyph';
import ProjectList from '@/components/ProjectList';

export default async function Projects() {
    const { data } = await contentful.query({
        query: getFeaturedPortfolioQuery
    });

    const featuredProjects = data?.portfolioItemCollection?.items;

    return (
        <div className="w-full p-10 xl_p-24">
            <div className="max-w-full flex flex-wrap items-baseline">
                <Anaglyph component="span" className="title-h1 mr-16">Projects</Anaglyph>
                <Link href="/projects" className="anchor-clear">See All</Link>
            </div>
            <div className="py-16">
                <ProjectList items={featuredProjects} />
            </div>
        </div>
    )
}