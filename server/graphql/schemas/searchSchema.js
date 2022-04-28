import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    search(query: String!, type: String!): SearchResults
  }

  type SearchResults {
    albums: AlbumItem
    artists: ArtistItem
    tracks: TrackItem
    users: [User]
  }

  type AlbumItem {
    items: [Album]
  }
  type ArtistItem {
    items: [Artist]
  }
  type TrackItem {
    items: [Track]
  }
`;
