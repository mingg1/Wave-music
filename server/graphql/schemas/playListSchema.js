import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    featuredPaylists: [SfPlaylist]
    userPlaylists(userId: ID!): [UserPlaylist]
  }
  extend type Mutation {
    addPlayLists(name: String!, userId: ID!): UserPlaylist
    addTrackToPlaylist(playlistId: ID!, trackId: ID!): UserPlaylist
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
    tracks: [String]
    createdAt: String
  }
`;
