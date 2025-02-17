import Link from "next/link";
import contentful from '@/api/contentful';
import { getFeaturedPortfolioQuery } from '@/graphql/portfolio.gql';
import Anaglyph from '@/components/Anaglyph';
import ProjectList from '@/components/ProjectList';
import { getAssetLinksFromContent } from "@/util/richContent";
import { IPortfolioItem } from "@/components/ProjectList/projectList";

export default async function Projects() {
    const { data } = await contentful.query({
        query: getFeaturedPortfolioQuery
    });

    let featuredProjects = data?.portfolioItemCollection?.items as IPortfolioItem[];

    if (featuredProjects?.length) {
        const items = [];
        for (const portfolioItem of featuredProjects) {
            if (!portfolioItem.content?.json) {
                items.push(portfolioItem);

                continue;
            }

            const links = await getAssetLinksFromContent(portfolioItem.content.json);

            items.push({
                ...portfolioItem,
                content: {
                    ...portfolioItem.content,
                    links
                },
            });
        }

        featuredProjects = items;
    }

    return (
        <div className="w-full p-10 xl_p-24">
            <div className="max-w-full flex flex-wrap items-baseline">
                <Anaglyph component="span" className="title-h1 mr-16">Projects</Anaglyph>
                <Link href="/projects" className="anchor-clear">See All</Link>
            </div>
            <div className="py-4">
                <ProjectList items={featuredProjects} />
            </div>
        </div>
    )
}