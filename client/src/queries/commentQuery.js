import { gql } from '@apollo/client';
import { fetchComments } from '../store';

export const GET_COMMENTS = gql`
  query Query($type: String!, $pageId: ID!) {
    comments(type: $type, pageId: $pageId) {
      owner {
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
});
