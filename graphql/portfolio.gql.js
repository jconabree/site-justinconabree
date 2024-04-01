import { gql } from '@apollo/client';

export const getFeaturedPortfolioQuery = gql`
    query GetFeaturedPortfolioItems {
        portfolioItemCollection (
            where: { isFeatured: true }
        ) {
            items {
                id
                title
                isFeatured
                highlightedTech
                tech
                content {
                    json
                }
                imagesCollection {
                    items {
                        url
                    }
                }
            }
        }
    }
`