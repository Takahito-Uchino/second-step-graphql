import { initUrqlClient } from "next-urql";
import { Client, ssrExchange, cacheExchange, fetchExchange } from "urql";

const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT!;

export function urqlClient(): Promise<Client> {
  const ssrCache = ssrExchange({ isClient: false });
  return new Promise((resolve, reject) => {
    const client = initUrqlClient(
      {
        url: GRAPHQL_ENDPOINT,
        exchanges: [cacheExchange, ssrCache, fetchExchange]
      },
      false,
    );
    if (!client) {
      reject(Error('Failed to init initUrqlClient.'));
    } else {
      resolve(client);
    }
  });
}
