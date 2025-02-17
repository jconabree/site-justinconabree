import { gql } from '@apollo/client';

export const getAssetByFileNameQuery = gql`
    query AssetCollection($filename: String!) {
        assetCollection(
            where: {
                fileName: $filename
            }
        ) {
            items {
                fileName
                url
            }
        }
    }
`;

export const getAssetByTitleQuery = gql`
    query AssetCollection($title: String!) {
        assetCollection(
            where: {
                title: $title
            }
        ) {
            items {
                fileName
                url
            }
        }
    }
`;

export const getAssetsByLinkIds = gql`
query AssetCollectionByIds($linkIds: [String!]!) {
    assetCollection(
        where: {
            sys: {
                id_in: $linkIds
            }
        }
    ) {
        items {
            sys {
                id
            }
            url
            width
            height
            title
            contentType
        }
    }
}
`