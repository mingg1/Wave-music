import gql from "graphql-tag";

export default gql`
  extend type Query {
    artist(ids: ID!): [Artist]
    relatedArtists(id: ID!): [Artist]
    artistTopTracks(id: ID!): [Track]
    artistAlbums(id: ID!): [Album]
  }

  type Artist {
    id: ID!
    genres: [String]
    images: [Image]
    name: String!
    type: String!
  }
`;
