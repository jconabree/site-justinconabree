import Link from "next/link";
import contentful from '@/api/contentful';
import { getFeaturedPortfolioQuery } from '@/graphql/portfolio.gql';

interface PortfolioItem {
    id: string;
    title: string;
    isFeatured: boolean;
    highlightedTech: string[];
    tech: string[];
    content: {
        json: string;
    };
    imagesCollection: {
        items: {
            url: string;
        }[]
    }
}

export default async function Projects() {
    const { data } = await contentful.query({
        query: getFeaturedPortfolioQuery
    });

    const featuredProjects = data?.portfolioItemCollection;

    return (
        <div className="w-full p-24">
            <div>
                <span className="title-h1 mr-16">Projects</span>
                <Link href="/portfolio" className="anchor">See All</Link>
            </div>
            <div className="py-16">
                {featuredProjects.items?.map((portfolioItem: PortfolioItem) => {
                    return (
                        <div className="pb-10">
                            <div className="w-full flex justify-between">
                                <div>{portfolioItem.title}</div>
                                <div className="text-sm">
                                    {portfolioItem.highlightedTech.map((tech) => {
                                        return `(${tech})`
                                    }).join(', ')}
                                </div>
                            </div>
                            <div className="w-full border-t border-black" />
                            <div className="pb-32">
                                content
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}