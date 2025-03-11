import { notFound } from 'next/navigation';
import contentful from '@/api/contentful';
import { getAllItemUrls, getPortfolioDetailsQuery } from '@/graphql/portfolio.gql';
import Anaglyph from '@/components/Anaglyph';
import ProjectDetails from '@/components/ProjectDetails';
import { getAssetLinksFromContent } from "@/util/richContent";
import Link from 'next/link';
import { Metadata } from 'next';

interface ProjectDetailPageProps {
    params: Promise<{
        projectUrlKey: string;
    }>
}

export default async function ProjectDetailPage(props: ProjectDetailPageProps) {
    const { params } = props;
    const { projectUrlKey } = await params;

    const { data } = await contentful.query({
        query: getPortfolioDetailsQuery,
        variables: {
            urlKey: projectUrlKey
        }
    });

    let details = data?.portfolioItemCollection?.items?.[0];
    if (!details) {
        notFound();
    }

    if (details.content) {
        const links = await getAssetLinksFromContent(details.content.json);
    
        details = {
            ...details,
            content: {
                ...details.content,
                links
            }
        };
    }
    

    return (
        <main className="flex min-h-screen flex-col py-12 lg_py-24 px-8 md_px-12 lg_px-24 content-page">
            <div className="py-6">
                <Link className="anchor text-sm" href="/projects">Back to Projects</Link>
            </div>
            <Anaglyph
                component="h1"
                className="title-h1 w-full mb-3 md_mb-8 break-words overflow-visible"
                disableScrollTopCheck
            >
                {details.title}
            </Anaglyph>
            <div className="w-full md_py-12 lg_py-24">
                <ProjectDetails details={details} page />
            </div>
        </main>
    )
}

export async function generateMetadata(props: ProjectDetailPageProps): Promise<Metadata> {
    const { params } = props;
    const { projectUrlKey } = await params;

    const { data } = await contentful.query({
        query: getPortfolioDetailsQuery,
        variables: {
            urlKey: projectUrlKey
        }
    });

    const project = data?.portfolioItemCollection?.items?.[0];

    if (!project) {
        return {
            title: `Project | Justin Conabree`,
            description: 'Checkout some of the details about this project I worked on project using various technologies like Javascript and Typescript, NextJS and React, GraphQL, PHP, and a lot more.',
        }
    }

    return {
      title: `${project.title} | Project | Justin Conabree`,
      description: project.shortDescription,
      publisher: 'Justin Conabree',
      openGraph: {
        type: 'article',
        authors: 'Justin Conabree',
        modifiedTime: project.sys.publishedAt,
        publishedTime: project.sys.firstPublishedAt,
        section: 'Projects',
        tags: project.tech?.slice(0, 6)
      }
    }
}

export async function generateStaticParams() {
    const { data } = await contentful.query({
        query: getAllItemUrls
    });

    const items = data?.portfolioItemCollection?.items;

    if (!items?.length) {
        return [];
    }
   
    return items.map(({ urlKey }: { urlKey: string; }) => ({
        projectUrlKey: urlKey,
    }));
}