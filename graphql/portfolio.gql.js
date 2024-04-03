import { gql } from '@apollo/client';

const PortfolioItemFragment = gql`
    fragment PortfolioItemFragment on PortfolioItem {
        id
        title
        urlKey
        workType
        highlightedTech
        tech
        content {
            json
        }
        imagesCollection {
            items {
                url
                width
                height
            }
        }
    }
`

export const getFeaturedPortfolioQuery = gql`
    query GetFeaturedPortfolioItems {
        portfolioItemCollection (
            where: { isFeatured: true }
        ) {
            items {
                ...PortfolioItemFragment
            }
        }
    }
    ${PortfolioItemFragment}
`;

export const getPortfolioItemsQuery = gql`
    query GetPortfolioItems {
        portfolioItemCollection {
            items {
                ...PortfolioItemFragment
            }
        }
    }
    ${PortfolioItemFragment}
`;

export const getAllItemUrls = gql`
    query GetAllPortfolioUrls {
        portfolioItemCollection {
            items {
                id
                urlKey
            }
        }
    }
`;

export const getPortfolioDetailsQuery = gql`
    query GetPortfolioItems($urlKey: String!) {
        portfolioItemCollection(
            where: {
                urlKey: $urlKey
            }
        ) {
            items {
                ...PortfolioItemFragment
            }
        }
    }
    ${PortfolioItemFragment}
`;