import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    user(id: ID!): User
    login(email: String!, password: String!): User
  }

  extend type Mutation {
    registerUser(nickname: String!, password: String!, email: String!): User
    updateUser(nickname: String, password: String, email: String): User
  }

  type User {
    id: ID!
    nickname: String!
    email: String!
    token: String
  }
`;
