import { getErrorVisualizationDefinition } from "errors/services/visualization-resolver/errorVisualizationResolver";
import { CLIENT_ERROR_VISUALIZATION_MAP } from "errors/client/visualization/ClientErrorVisualizationMap";
import { transformWeMiError } from "./baseErrorTransformer";

/**
 * Transforms a wemi client error.
 * @param {*} error An instance of WeMiClientError.
 */
export function transformWeMiClientError(error) {
  const errorInformationDTO = transformWeMiError(error);

  errorInformationDTO.identifier = error.code;
  errorInformationDTO.debugMessage = error.message;

  const {
    message,
    title,
    fatal,
    preventDefaultManagement,
    buttonText,
    showSendReport,
  } = getErrorVisualizationDefinition(errorInformationDTO, CLIENT_ERROR_VISUALIZATION_MAP);

  errorInformationDTO.message = message || 'Errore inatteso';
  errorInformationDTO.title = title || 'Si è verificato un errore inatteso.';
  errorInformationDTO.fatal = fatal;
  errorInformationDTO.preventDefaultManagement = preventDefaultManagement;
  errorInformationDTO.buttonText = buttonText || 'Chiudi';
  errorInformationDTO.showSendReport = showSendReport;

  return errorInformationDTO;
}
