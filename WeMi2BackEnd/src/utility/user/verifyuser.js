import { UNAUTHENTICATED } from "../../errors/authorization";
import { ApolloError } from "apollo-server";

export const verifyUser = (user) => {
  if (!user) {
    throw (UNAUTHENTICATED.message, UNAUTHENTICATED.code);
  }
  return user;
}