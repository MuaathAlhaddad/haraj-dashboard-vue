import { gql } from 'graphql-tag';


export const Ads = gql`
query {
    ads {
        data {
            id
            title
            description
            price
            sku
            negotiable
            created_at
        }
    }
}
`

