import { getErrorVisualizationDefinition } from 'errors/services/visualization-resolver/errorVisualizationResolver';
import { NETWORK_ERROR_VISUALIZATION_MAP } from 'errors/api/visualization/NetworkErrorVisualizationMap';
import { transformWeMiError } from './baseErrorTransformer';

/**
 * Transforms a network error.
 * @param {*} error An instance of NetworkError.
 */
export function transformNetworkError(error) {
  const errorInformationDTO = transformWeMiError(error);

  errorInformationDTO.identifier = error.status;
  errorInformationDTO.debugMessage = `Network Error (${error.status}) - ${error.statusText}`;

  const {
    message,
    title,
    fatal,
    preventDefaultManagement,
    buttonText,
    showSendReport,
  } = getErrorVisualizationDefinition(errorInformationDTO, NETWORK_ERROR_VISUALIZATION_MAP);

  errorInformationDTO.message = message;
  errorInformationDTO.title = title;
  errorInformationDTO.fatal = fatal;
  errorInformationDTO.preventDefaultManagement = preventDefaultManagement;
  errorInformationDTO.buttonText = buttonText || 'Chiudi';
  errorInformationDTO.showSendReport = showSendReport;

  return errorInformationDTO;
}
