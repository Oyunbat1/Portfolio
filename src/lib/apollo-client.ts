import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
// process.env.NEXT_PUBLIC_GRAPHQL_URL || 
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
