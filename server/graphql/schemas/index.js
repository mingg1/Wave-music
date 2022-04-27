import { gql } from 'apollo-server-express';
import albumSchema from './albumSchema';
import artistSchema from './artistSchema';
import userSchema from './userSchema';
import trackSchema from './trackSchema';
import tokenSchema from './tokenSchema';
import playListSchema from './playListSchema';
import searchSchema from './searchSchema';
import commentSchema from './commentSchema';

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }

  type Image {
    height: Int
    url: String
    width: Int
  }
`;

export default [
  userSchema,
  linkSchema,
  tokenSchema,
  trackSchema,
  artistSchema,
  albumSchema,
  playListSchema,
  searchSchema,
  commentSchema,
];
