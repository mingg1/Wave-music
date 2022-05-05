import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    featuredPaylists: [SfPlaylist]
    userPlaylists(userId: ID!): [UserPlaylist]
    userPlaylist(playlistId: ID!): UserPlaylist
  }
  extend type Mutation {
    addPlayLists(name: String!, userId: ID!): UserPlaylist
    deletePlaylist(playlistId: ID!): UserPlaylist
    addTrackToPlaylist(playlistId: ID!, trackId: ID!): UserPlaylist
    deleteTrackFromPlaylist(playlistId: ID!, trackId: ID!): UserPlaylist
  }

  type SfPlaylist {
    id: ID
    images: [Image]
    name: String!
    createdAt: Int
    description: String
    collaborative: Boolean
  }

  type UserPlaylist {
    id: ID
    name: String!
    owner: User
    tracks: [Track]
    createdAt: String
    userMade: Boolean
  }
`;
