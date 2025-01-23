import { ApolloLink } from "@apollo/client";
import { setContext } from "apollo-link-context";
import * as Application from "expo-application";

export const applicationIdLinkMiddleware = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "application-id": Application.applicationId,
    },
  };
}) as unknown as ApolloLink;
