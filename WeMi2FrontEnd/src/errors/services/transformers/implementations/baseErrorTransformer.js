import { ErrorInformationDTO } from "errors/DTOs/ErrorInformationDTO";

/**
 * Transforms a WeMi error.
 * @param {*} error An instance of WeMiError.
 */
export function transformWeMiError(error) {
  const errorInformationDTO = new ErrorInformationDTO();
  errorInformationDTO.stacktrace = error.stack;

  return errorInformationDTO;
}
