import { gql } from '@apollo/client';

export const getAssetQuery = gql`
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