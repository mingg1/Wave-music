import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    user(id: ID!): User
    login(email: String!, password: String!): Token
    song: Song
  }

  type Mutation {
    registerUser(nickname: String!, password: String!, email: String!): User
    updateUser(nickname: String, password: String, email: String): User
  }

  type User {
    id: ID
    nickname: String
    email: String
  }

  type Token {
    value: String!
  }
  type Song {
    token: String
  }
`;
