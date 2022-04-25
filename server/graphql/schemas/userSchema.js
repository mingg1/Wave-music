import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    user(id: ID!): User
    login(email: String!, password: String!): User
    userFavorites(id: ID): Favorite
  }

  extend type Mutation {
    registerUser(nickname: String!, password: String!, email: String!): User
    updateUser(nickname: String, password: String, email: String): User
    addFavorite(id: ID, type: String, userId: ID): Favorite
  }

  type User {
    id: ID!
    nickname: String!
    email: String!
    token: String
    favorites: Favorite
  }

  type Favorite {
    id: ID
    owner: User
    tracks: [Track]
  }
`;
