import { ERROR_TRANSFORMER_MAPPING } from './ErrorMapping';
import { transformUnknownError } from './implementations/defaultTransformer';

/**
 * Resolves the transformer for the provided error.
 */
export function resolveTransformer(error) {
  const mapping = ERROR_TRANSFORMER_MAPPING.find(
    value => error instanceof value.error
  );

  if (mapping) {
    const { transformer: transformFn } = mapping;
    return transformFn;
  }

  // returns the default transformer.
  return transformUnknownError;
}
