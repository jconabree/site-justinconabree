import type { MetadataRoute } from 'next';
import { buildUrl } from '@/util/url';
 
export default async function robots(): Promise<MetadataRoute.Robots> {    
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/style-guide', '/not-found'],
        },
        sitemap: buildUrl('sitemap.xml'),
    };
}