import gql from "graphql-tag";
import artistSchema from "./artistSchema.js";
import albumSchema from "./albumSchema.js";
import userSchema from "./userSchema.js";
import trackSchema from "./trackSchema.js";
import tokenSchema from "./tokenSchema.js";
import playListSchema from "./playListSchema.js";
import searchSchema from "./searchSchema.js";
import commentSchema from "./commentSchema.js";
import postSchema from "./postSchema.js";

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
  postSchema,
];
