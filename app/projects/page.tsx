import type { Metadata } from "next";

import contentful from '@/api/contentful';
import { getPortfolioItemsQuery } from '@/graphql/portfolio.gql';
import Anaglyph from "@/components/Anaglyph";
import ProjectList from '@/components/ProjectList';

export default async function Projects() {
    const { data } = await contentful.query({
        query: getPortfolioItemsQuery
    });

    const items = data?.portfolioItemCollection?.items;

    return (
        <main className="flex min-h-screen flex-col px-8 py-24 md_px-12 lg_px-24 content-page">
            <Anaglyph
                component="h1"
                className="title-h1 w-full mb-3 md_mb-8"
                disableScrollTopCheck
            >
                Projects
            </Anaglyph>
            <div className="mb-8 md_mb-16 w-full">Browse some of the projects I&apos;ve worked on</div>
            <ProjectList items={items} navigateOnClick priority />
        </main>
    )
}

export const metadata: Metadata = {
	title: "Projects | Justin Conabree",
	description: "A list some of the different project I've worked on with various technologies like Javascript and Typescript, NextJS and React, GraphQL, PHP, and a lot more.",
    publisher: 'Justin Conabree',
    openGraph: {
        type: 'website',
    }
};