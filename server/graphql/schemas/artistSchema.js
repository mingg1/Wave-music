import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    artist(id: String): Artist
    related_artists(id: String): [Artist]
    featured_playlists: [Album]
  }

  type Artist {
    id: String!
    genres: [String]
    images: [Image]
    name: String!
    type: String!
  }

  type Song {
    name: String!
    url: String
  }

  type Query {
    tracks: [Song]
  }
`;
