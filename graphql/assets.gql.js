import { gql } from '@apollo/client';

const AssetFragment = gql`
    fragment AssetDetailsFragment on Asset {
        fileName
        url
        width
        height
        title
        contentType
    }
`
export const getAssetByFileNameQuery = gql`
    query AssetCollection($filename: String!) {
        assetCollection(
            where: {
                fileName: $filename
            }
        ) {
            items {
                ...AssetDetailsFragment
            }
        }
    }
    ${AssetFragment}
`;

export const getAssetByTitleQuery = gql`
    query AssetCollection($title: String!) {
        assetCollection(
            where: {
                title: $title
            }
        ) {
            items {
                ...AssetDetailsFragment
            }
        }
    }
    ${AssetFragment}
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
                ...AssetDetailsFragment
            }
        }
    }
    ${AssetFragment}
`;