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