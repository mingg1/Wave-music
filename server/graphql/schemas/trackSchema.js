import { gql } from 'apollo-server-express';

export default gql`
  type Track {
    id: Int!
    duration_ms: Int
    name: String!
    preview_url: String
    images: [Image]
  }

  type Image {
    height: Int
    url: String
    width: Int
  }
`;
