import gql from 'graphql-tag';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject} from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

const cache = new InMemoryCache();
const link = new HttpLink({
    uri: 'http://localhost:4000/',
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache,
    link,
});

client.query({
    query: gql`
        query GetLaunch {
            launch(id: 6) {
                id
                mission {
                    name
                }
            }
        }
    `
}).then(result => console.dir(result));