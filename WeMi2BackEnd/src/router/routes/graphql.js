import "dotenv/config";
import { ApolloServer } from "apollo-server-express";
import { formatError } from "../../errors/formatter";
import { schema, context, subscriptions } from "../../modules/mainmodule";
import { WeMiTracing } from "utility/logger/tracing";
import { __PRODUCTION__ } from "environment";


export const serverGraphQL = new ApolloServer({
    schema,
    playground: !__PRODUCTION__,
    debug: true,
    formatError: formatError,
    extensions: [() => new WeMiTracing()],
    context,
    subscriptions: subscriptions
  });
