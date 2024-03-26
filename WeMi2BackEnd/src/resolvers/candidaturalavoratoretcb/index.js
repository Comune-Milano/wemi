import mutations from "./mutation";
import { queriesGql } from "./query";

export default {
  Query: queriesGql.Query,
  Mutation: mutations.Mutation
}