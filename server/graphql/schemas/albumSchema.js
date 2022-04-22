import { gql } from 'apollo-server-express';

export default gql`
  type Album {
    id: String!
    album_type: String
    images: [Image]
    name: String!
    release_date: String!
    type: String!
    artists: [Artist]
    tracks: [Track]
  }
`;
