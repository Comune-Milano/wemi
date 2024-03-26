import { GraphQLModule } from '@graphql-modules/core';
import schema from '../schema';
import resolvers from '../resolvers';
import { DirectivesModule } from './directivesmodule';
import { contextCreation } from '../utility/contextcreation';


export const WeMiModule = new GraphQLModule({
  name: 'WeMi',
  imports: [DirectivesModule],
  typeDefs: schema,
  resolvers: resolvers,
  context: contextCreation
});