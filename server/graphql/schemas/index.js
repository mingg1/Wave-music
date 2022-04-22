import { gql } from 'apollo-server-express';
import albumSchema from './albumSchema';
import artistSchema from './artistSchema';
import userSchema from './userSchema';
import trackSchema from './trackSchema';

export default [albumSchema, artistSchema, userSchema, trackSchema];
