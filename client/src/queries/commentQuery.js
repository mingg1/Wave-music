import { gql } from '@apollo/client';
import { addComment, fetchComments, removeComment, removePost } from '../store';

export const GET_COMMENTS = gql`
  query Query($type: String!, $pageId: ID!) {
    comments(type: $type, pageId: $pageId) {
      owner {
        id
        nickname
      }
      text
      id
      createdAt
      type
    }
  }
`;

export const mapStateToProps = (state) => ({ state });
export const mapDispatchToProps = (dispatch) => ({
  getFetchedComments: (data) => {
    dispatch(fetchComments(data));
  },
  comment: (comment) => {
    dispatch(addComment(comment));
  },
  deleteComment: (commentId) => {
    dispatch(removeComment(commentId));
  },
  removePost: (id) => {
    dispatch(removePost(id));
  },
});
