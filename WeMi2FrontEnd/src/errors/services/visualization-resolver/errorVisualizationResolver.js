
import { replaceInterpolations } from "../replace-interpolations/replace-interpolations";

/**
 * Returns the visualization definition of the given error identifier.
 * @param {*} identifier The error identifier.
 * @param {*} MESSAGES_MAP Map an error identifier to a message-title pair.
 */
export function getErrorVisualizationDefinition(errorDTO, MESSAGES_MAP) {
  const { identifier } = errorDTO;
  if (!MESSAGES_MAP.has(identifier)) {
    return { message: '', title: '' };
  }
  const {
    message,
    title,
    fatal,
    preventDefaultManagement,
    buttonText,
    showSendReport,
  } = MESSAGES_MAP.get(identifier);

  return {
    message: replaceInterpolations(message, errorDTO.interpolations),
    title: replaceInterpolations(title, errorDTO.interpolations),
    fatal: !!fatal,
    preventDefaultManagement: !!preventDefaultManagement,
    buttonText,
    showSendReport: !!showSendReport,
  };
}
