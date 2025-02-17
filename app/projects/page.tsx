import type { Metadata } from "next";

import contentful from '@/api/contentful';
import { getPortfolioItemsQuery } from '@/graphql/portfolio.gql';
import Anaglyph from "@/components/Anaglyph";
import ProjectList from '@/components/ProjectList';

export const metadata: Metadata = {
	title: "Projects | Justin Conabree"
};

export default async function Projects() {
    const { data } = await contentful.query({
        query: getPortfolioItemsQuery
    });

    const items = data?.portfolioItemCollection?.items;

    return (
        <main className="flex min-h-screen flex-col p-24 content-page">
            <Anaglyph
                component="h1"
                className="title-h1 w-full mb-8"
                disableScrollTopCheck
            >
                Projects
            </Anaglyph>
            <div className="mb-16 w-full">Browse some of the projects I&apos;ve worked on</div>
            <ProjectList items={items} navigateOnClick priority />
        </main>
    )
}