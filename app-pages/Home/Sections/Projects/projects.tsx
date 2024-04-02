import Link from "next/link";
import contentful from '@/api/contentful';
import { getFeaturedPortfolioQuery } from '@/graphql/portfolio.gql';
import PortfolioList from '@/components/PortfolioList';

export default async function Projects() {
    const { data } = await contentful.query({
        query: getFeaturedPortfolioQuery
    });

    const featuredProjects = data?.portfolioItemCollection?.items;

    return (
        <div className="w-full p-10 xl_p-24">
            <div className="max-w-full flex flex-wrap items-baseline">
                <span className="title-h1 mr-16">Projects</span>
                <Link href="/projects" className="anchor-clear">See All</Link>
            </div>
            <div className="py-16">
                <PortfolioList items={featuredProjects} />
            </div>
        </div>
    )
}