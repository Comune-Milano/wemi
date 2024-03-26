
import { resolveTransformer } from './transformerResolver';

/**
 * Transforms the error to an ErrorInformationDTO.
 * @param {*} error
 */
export function getErrorDTO(error) {
  // Transform the error (all the transformers should return the an Error DTO).
  const transform = resolveTransformer(error);
  // Get the error information DTO.
  return transform(error);
}
