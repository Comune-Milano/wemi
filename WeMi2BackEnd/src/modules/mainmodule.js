import { GraphQLModule } from "@graphql-modules/core";
import { WeMiModule } from "./wemimodule";
import { resolversComposition } from '../resolverCompositions';
import { DirectivesModule } from "./directivesmodule";

const WeMiGraphQLModule = new GraphQLModule({
    name: 'wemi',
    imports: [DirectivesModule, WeMiModule],
    resolversComposition
 });
 
 
 export const { schema, context, subscriptions } = WeMiGraphQLModule;