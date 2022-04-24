import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    featured_playlists: [PlayList]
    playlist_tracks(id: ID!): [TrackInfo]
  }

  type PlayList {
    id: ID
    images: [Image]
    name: String!
    owner: Owner
    createdAt: Int
  }

  type Owner {
    id: ID
    type: String
    display_name: String
  }

  type TrackInfo {
    track: Track
  }

  type Track {
    id: ID!
    duration_ms: Int
    name: String!
    preview_url: String
    images: [Image]
    album: [Album]
    artists: [Artist]
    type: String
  }
`;
