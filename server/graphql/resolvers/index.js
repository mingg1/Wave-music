import artistResolver from './artistResolver';
import playlistResolver from './playlistResolver';
import userResolver from './userResolver';
import tokenResolver from './tokenResolver';
import albumResolver from './albumResolver';
import trackResolver from './trackResolver';

export default [
  userResolver,
  tokenResolver,
  playlistResolver,
  artistResolver,
  albumResolver,
  trackResolver,
];
