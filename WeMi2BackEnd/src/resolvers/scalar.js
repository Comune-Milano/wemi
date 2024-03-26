import uuid from 'uuid'
import GraphQLJSON from 'graphql-type-json';
import { GraphQLDate, GraphQLTime, GraphQLDateTime } from 'graphql-iso-date';

export default {
  UUID: uuid,
  JSON: GraphQLJSON,
  Date: GraphQLDate,
  Time: GraphQLTime,
  DateTime: GraphQLDateTime,
  Timestamp: GraphQLDateTime,
};
