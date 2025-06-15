"use client";

import { ApolloProvider } from "@apollo/client";
import { Provider as ChakraProvider } from "@/components/ui/provider";
import { client } from "../lib/apollo-client";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>{children}</ChakraProvider>
    </ApolloProvider>
  );
};

export { Providers };
