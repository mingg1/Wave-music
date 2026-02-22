import gql from "graphql-tag";

export default gql`
  extend type Query {
    albums(ids: ID!): [Album]
    newReleases: [Album]
    albumTracks(id: ID!): [Track]
  }

  type Album {
    id: ID!
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
