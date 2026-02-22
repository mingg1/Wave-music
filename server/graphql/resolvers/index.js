import artistResolver from "./artistResolver.js";
import playlistResolver from "./playlistResolver.js";
import userResolver from "./userResolver.js";
import tokenResolver from "./tokenResolver.js";
import albumResolver from "./albumResolver.js";
import trackResolver from "./trackResolver.js";
import searchResolver from "./searchResolver.js";
import commentResolver from "./commentResolver.js";
import postResolver from "./postResolver.js";

export default [
  userResolver,
  tokenResolver,
  playlistResolver,
  artistResolver,
  albumResolver,
  trackResolver,
  searchResolver,
  commentResolver,
  postResolver,
];
