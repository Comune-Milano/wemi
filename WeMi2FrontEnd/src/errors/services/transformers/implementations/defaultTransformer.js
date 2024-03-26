import { transformWeMiError } from "./baseErrorTransformer";

/**
 * Transforms a WeMi error.
 * @param {*} error An instance of WeMiError.
 */
export function transformUnknownError(error) {
  const errorInformationDTO = transformWeMiError(error);

  errorInformationDTO.identifier = 'UNKNOWN_IDENTIFIER';
  errorInformationDTO.message = 'Si è verificato un errore applicativo non atteso.';
  errorInformationDTO.title = 'Errore inatteso';
  errorInformationDTO.debugMessage = 'Unknown error';

  return errorInformationDTO;
}
