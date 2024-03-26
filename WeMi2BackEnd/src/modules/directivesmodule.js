import { gql } from 'apollo-server-express';
import { GraphQLModule } from '@graphql-modules/core';

export const DirectivesModule = new GraphQLModule({
  typeDefs: gql`
    #To use if you need to verify if the user it's authenticated or not
    directive @auth on FIELD_DEFINITION
    #To use if you need to verify if the user it's authorized on that resource
    directive @protect(roles: [String]) on FIELD_DEFINITION
    #To use if you need to verify if the user it's the owner of that resource
    directive @validate(type: String, argsKey: String) on FIELD_DEFINITION
    #To use if you need to deprecate a resource
    directive @deprecate(reason: String) on FIELD_DEFINITION
    #To use if you need to verify if the user it's authorized on that resource
    directive @allowed(list: [Int]) on FIELD_DEFINITION
  `});