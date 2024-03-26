
import { getErrorVisualizationDefinition } from 'errors/services/visualization-resolver/errorVisualizationResolver';
import { GRAPHQL_ERROR_VISUALIZATION_MAP } from 'errors/api/visualization/GraphQLErrorVisualizationMap';
import { transformWeMiError } from './baseErrorTransformer';

/**
 * Transforms a GraphQL backend error.
 * @param {*} error An instance of GraphQLApiError.
 */
export function transformGraphQLApiError(error) {
  const errorInformationDTO = transformWeMiError(error);

  const [topError] = error.graphQLErrors;
  errorInformationDTO.debugMessage = topError.message;
  errorInformationDTO.identifier = topError.code;
  errorInformationDTO.interpolations = topError.data;

  const {
    message,
    title,
    fatal,
    preventDefaultManagement,
    buttonText,
    showSendReport,
  } = getErrorVisualizationDefinition(errorInformationDTO, GRAPHQL_ERROR_VISUALIZATION_MAP);

  errorInformationDTO.message = message || 'Si è verificato un errore non identificato in fase di comunicazione con il backend.';
  errorInformationDTO.title = title || 'Errore API';
  errorInformationDTO.fatal = fatal;
  errorInformationDTO.preventDefaultManagement = preventDefaultManagement;
  errorInformationDTO.buttonText = buttonText || 'Chiudi';
  errorInformationDTO.showSendReport = showSendReport;

  return errorInformationDTO;
}
