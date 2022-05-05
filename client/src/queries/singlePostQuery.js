import { gql } from '@apollo/client';

export const SINGLE_POST = gql`
  query Query($postId: ID!, $type: String!) {
    post(postId: $postId) {
      id
      title
      description
      owner {
        id
        nickname
      }
      createdAt
    }
    comments(type: $type, pageId: $postId) {
      owner {
        id
        nickname
      }
      text
      id
      createdAt
    }
  }
`;

export const EDIT_POST = gql`
  mutation EditPost($postId: ID!, $title: String, $description: String) {
    editPost(postId: $postId, title: $title, description: $description) {
      id
      title
      description
      createdAt
    }
  }
`;

export const DELETE_POST = gql`
  mutation Mutation($postId: ID!) {
    deletePost(postId: $postId) {
      id
    }
  }
`;
