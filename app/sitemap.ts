import { MetadataRoute } from "next";
import { contentful } from '@/api';
import { getAllItemUrls } from '@/graphql/portfolio.gql';
import { buildUrl } from '@/util/url';

const getStaticPages = async (): Promise<MetadataRoute.Sitemap> => {
    return [{
        url: buildUrl('/'),
        lastModified: new Date(),
        changeFrequency: 'weekly',
    }, {
        url: buildUrl('/projects'),
        lastModified: new Date(),
        changeFrequency: 'daily',
    }, {
        url: buildUrl('/contact'),
        lastModified: new Date(),
        changeFrequency: 'daily',
    }];
}

const getProjectPages = async (): Promise<MetadataRoute.Sitemap> => {
    const { data: posts } = await contentful.query({
        query: getAllItemUrls
    }) as unknown as {
        data: {
            portfolioItemCollection: {
                items: {
                    id: string;
                    urlKey: string;
                    sys: {
                        publishedAt: string
                    }
                }[]
            }
        }
    };
   
    return posts?.portfolioItemCollection?.items?.map((item) => ({
        url: buildUrl(`/projects/${item.urlKey}`),
        lastModified: item.sys.publishedAt,
        changeFrequency: 'weekly',
    })) || [];
}


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const projectPages = await getProjectPages();
    const staticPages = await getStaticPages();

    return [
        ...staticPages,
        ...projectPages
    ];
}