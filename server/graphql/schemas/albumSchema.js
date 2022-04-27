import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    albums(ids: ID!): [Album]
    newReleases: [Album]
    albumTracks(id: ID!): [Track]
  }

  type Album {
    id: String!
    album_type: String
    name: String!
    images: [Image]
    release_date: String!
    artists: [Artist]
    tracks: AlbumTrack
    type: String!
  }

  type AlbumTrack {
    items: [Track]
  }
`;
