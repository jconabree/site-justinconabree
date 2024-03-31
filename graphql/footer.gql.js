import { gql } from '@apollo/client';

export const getFooterLinks = gql`
    query GetFooterLinks {
        footerLinksCollection(preview: false) {
            items {
                title
                sortOrder
                ... on FooterLinks {
                    itemsCollection (preview: false) {
                        items {
                            url
                            text
                            isExternal
                        }
                    }
                }
            }
        }
    }
`;

export const getFooterMarquee = gql`
    query GetFooterMarquee {
        marqueeCollection(where: { name: "Footer Marquee" }) {
            items {
                name
                content {
                    json
                }
            }
        }
    }
`