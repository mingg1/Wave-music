import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    comments(type: String!, pageId: ID!): [Comment]
  }

  extend type Mutation {
    addComment(
      owner: ID!
      text: String!
      type: String!
      postId: ID
      refId: ID
    ): Comment
    deleteComment(commentId: ID): Comment
  }

  type Comment {
    id: ID!
    owner: User
    text: String
    type: String
    postId: ID
    refId: ID
    createdAt: String
  }
`;
