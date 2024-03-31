import { gql } from '@apollo/client';

import { AllContentTypes } from './content.gql';

const PageFragment = `
  slug
  content {
    json
    links {
      entries {
        block {
          sys {
            id
          }
          ${AllContentTypes}
        }
      }
    }
  }
`;

export const getAllPagesQuery = gql`
  query GetAllLandingPagesQuery {
    pageLandingCollection(
      limit: 10
    ) {
      items {
        ${PageFragment}
      }
    }
  }
`;

export const getContentQuery = gql`
  query GetLandingPageContent($slug: String!) {
    pageLandingCollection(
      where: {
        slug: $slug
      }
      limit: 1
    ) {
      items {
        ${PageFragment}
      }
    }
  }
`;

export const getSeoQuery = gql`
  query GetLandingPageSeo($slug: String!) {
    pageLandingCollection(
      where: {
        slug: $slug
      }
      limit: 1
    ) {
      items {
        seoFields {
          pageTitle
          pageDescription
        }
      }
    }
  }
`;