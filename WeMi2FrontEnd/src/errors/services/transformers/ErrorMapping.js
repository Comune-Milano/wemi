import { WeMiClientError } from "errors/client/definitions/WeMiClientError";
import { NetworkError } from "errors/api/definitions/NetworkError";
import { GraphQLApiError } from "errors/api/definitions/GraphQLApiError";
import { transformWeMiClientError } from './implementations/wemiClientErrorTransformer';
import { transformGraphQLApiError } from './implementations/graphQLErrorTransformer';
import { transformNetworkError } from './implementations/networkErrorTransformer';

/**
 * Defines the error transformer mapping.
 */
export const ERROR_TRANSFORMER_MAPPING = [
  { error: WeMiClientError, transformer: transformWeMiClientError },
  { error: NetworkError, transformer: transformNetworkError },
  { error: GraphQLApiError, transformer: transformGraphQLApiError },
];
