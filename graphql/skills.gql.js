import { gql } from '@apollo/client';

export const getSkillAreasQuery = gql`
    query GetSkillAreas {
        techSkillAreaCollection(
            order: [orderNumber_ASC]
        ) {
            items {
                title
                type
                activeCortex
                skills
            }
        }
    }
`