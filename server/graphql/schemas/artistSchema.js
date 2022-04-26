import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    artist(id: ID!): Artist
    relatedArtists(id: ID!): [Artist]
    artistTopTracks(id: ID!): [Track]
    artistAlbums(id: ID!): [Album]
  }

  type Artist {
    id: String!
    genres: [String]
    images: [Image]
    name: String!
    type: String!
  }

  type TrackInfo {
    track: Track
  }
`;
