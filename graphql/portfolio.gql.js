import { gql } from '@apollo/client';

export const getFeaturedPortfolioQuery = gql`
    query GetFeaturedPortfolioItems {
        portfolioItemCollection (
            where: { isFeatured: true }
        ) {
            items {
                id
                title
                urlKey
                isFeatured
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
        }
    }
`

export const getPortfolioItemsQuery = gql`
    query GetPortfolioItems {
        portfolioItemCollection {
            items {
                id
                title
                urlKey
                isFeatured
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
        }
    }
`