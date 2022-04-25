import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
  from,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log('err: ', graphQLErrors);
  }

  if (networkError) {
    // handle network error
    console.log(networkError);
  }
});

const authLink = setContext(async (_, { headers }) => {
  const { sf_token } = JSON.parse(localStorage.getItem('sf-token')) || {};

  return {
    headers: {
      ...headers,
      sf_token,
    },
  };
});
const SERVER_URL = new HttpLink({ uri: 'http://localhost:4000/graphql' });
const appLink = from([errorLink, SERVER_URL]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(appLink),
});

export default client;
