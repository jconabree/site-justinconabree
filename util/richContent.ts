import { BLOCKS, Document } from '@contentful/rich-text-types';
import contentful from '@/api/contentful';
import { getAssetsByLinkIds } from '@/graphql/assets.gql';
import { IRichContent } from '@/components/RichContent';

export const getAssetLinksFromContent = async (content: Document): Promise<IRichContent['links']> => {
    const linkIds = content.content.reduce((ids, node) => {
        if (node.nodeType === BLOCKS.EMBEDDED_ASSET) {
            // @ts-ignore
            ids.push(node.data.target.sys.id);
        }

        return ids;
    }, []);

    if (!linkIds.length) {
        return null;
    }

    const linksQueryResult = await contentful.query({
        query: getAssetsByLinkIds,
        variables: {
            linkIds
        }
    });

    const links = linksQueryResult?.data?.assetCollection?.items;

    if (!links) {
        return null;
    }

    return {
        assets: {
            block: links
        }
    };
}
