import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    featuredPaylists: [SfPlayList]
  }

  type SfPlayList {
    id: ID
    images: [Image]
    name: String!
    createdAt: Int
    description: String
    collaborative: Boolean
  }
`;
