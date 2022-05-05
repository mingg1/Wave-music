import { gql } from '@apollo/client';

export const GET_USER_INFO = gql`
  query UserPlaylists($userId: ID!) {
    userPlaylists(userId: $userId) {
      id
      name
      userMade
    }
    user(id: $userId) {
      nickname
      favorites {
        tracks {
          id
          duration_ms
          name
          preview_url
          album {
            name
            images {
              url
            }
          }
          artists {
            name
            images {
              url
            }
            id
            type
          }
          type
        }
        artists {
          name
          type
          images {
            url
          }
          id
          type
        }
        albums {
          name
          images {
            url
          }
          id
          type
          artists {
            name
          }
        }
      }
    }
  }
`;
