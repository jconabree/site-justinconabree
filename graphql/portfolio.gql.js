import { gql } from '@apollo/client';

const getPortfolioItemFragment = (maxImages = 5) => {
    return gql`
        fragment PortfolioItemFragment on PortfolioItem {
            sys {
                publishedAt
                firstPublishedAt
            }
            id
            title
            urlKey
            shortDescription
            workType
            highlightedTech
            tech
            content {
                json
            }
            richMediaCollection(limit: ${maxImages}) {
                items {
                    asset {
                        url
                        width
                        height
                        contentType
                        title
                    }
                    poster {
                        url
                        width
                        height
                    }
                }
            }
        }
    `;
}

export const getFeaturedPortfolioQuery = gql`
    query GetFeaturedPortfolioItems {
        portfolioItemCollection (
            where: { isFeatured: true },
            order: [orderNumber_ASC]
        ) {
            items {
                ...PortfolioItemFragment
            }
        }
    }
    ${getPortfolioItemFragment()}
`;

export const getPortfolioItemsQuery = gql`
    query GetPortfolioItems {
        portfolioItemCollection {
            items {
                ...PortfolioItemFragment
            }
        }
    }
    ${getPortfolioItemFragment()}
`;

export const getAllItemUrls = gql`
    query GetAllPortfolioUrls {
        portfolioItemCollection {
            items {
                id
                urlKey
                sys {
                    publishedAt
                }
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
    ${getPortfolioItemFragment()}
`;