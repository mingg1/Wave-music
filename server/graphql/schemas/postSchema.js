import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    posts: [Post]
    userPosts(userId: ID): [Post]
  }

  extend type Mutation {
    addPost(owner: ID!, title: String!, description: String!): Post
    deletePost(postId: ID): Post
  }

  type Post {
    id: ID!
    title: String!
    description: String!
    owner: User
    createdAt: String
    meta: Meta
  }

  type Meta {
    views: Int
  }
`;
