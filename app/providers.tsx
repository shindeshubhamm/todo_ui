"use client";

import { ApolloProvider } from "@apollo/client";
import { client } from "./lib/apollo-client";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export { Providers };
