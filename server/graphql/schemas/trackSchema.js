import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    playlistTracks(playlistId: ID!): [TrackInfo]
    tracks(ids: ID!): [Track]
    recommendations(
      seedArtists: ID
      seedGenres: String
      seedTracks: ID
    ): [Track]
  }

  type TrackInfo {
    track: Track
  }

  type Track {
    id: ID!
    duration_ms: Int
    name: String!
    preview_url: String
    album: Album
    artists: [Artist]
    type: String
  }
`;
