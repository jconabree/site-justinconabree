import { gql } from '@apollo/client';

export const getMenuLinks = gql`
    query GetMenuLinks {
        menuLinksCollection(preview: false) {
            items {
                 ... on MenuLinks {
                    itemsCollection (preview: false) {
                        items {
                            url
                            text
                        }
                    }
                }
            }
        }
    }
`