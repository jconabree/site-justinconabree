import { notFound } from 'next/navigation';
import contentful from '@/api/contentful';
import { getAllItemUrls, getPortfolioDetailsQuery } from '@/graphql/portfolio.gql';
import ProjectDetails from '@/components/ProjectDetails';
import Link from 'next/link';

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

    const details = data?.portfolioItemCollection?.items?.[0];
    if (!details) {
        notFound();
    }

    return (
        <main className="flex min-h-screen flex-col p-24 content-page">
            <div className="py-6">
                <Link className="anchor text-sm" href="/projects">Back to Projects</Link>
            </div>
            <div className="title-h1">{details.title}</div>
            <div className="w-full py-24">
                <ProjectDetails details={details} />
            </div>
        </main>
    )
}

export async function generateMetadata(props: ProjectDetailPageProps) {
    const { params } = props;
    const { projectUrlKey } = await params;

    const { data } = await contentful.query({
        query: getPortfolioDetailsQuery,
        variables: {
            urlKey: projectUrlKey
        }
    });

    return {
      title: `Project | ${data?.portfolioItemCollection?.items?.[0]?.title} | Justin Conabree`,
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