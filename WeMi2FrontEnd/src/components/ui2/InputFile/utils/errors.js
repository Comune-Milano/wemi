export const FILE_LIMIT_EXECEEDED = 'FILE_LIMIT_EXECEEDED';
export const TOTAL_FILES_SIZE_EXECEEDED = 'TOTAL_FILES_SIZE_EXECEEDED';
export const INVALID_TYPE = 'INVALID_TYPE';

export const FILE_LIMIT_EXECEEDED_MESSAGE = {
  message: 'Non superare la massima dimensione: {maxDimension}',
  code: FILE_LIMIT_EXECEEDED,
  placeholder: 'maxDimension',
};
export const TOTAL_FILES_SIZE_EXECEEDED_MESSAGE = {
  message: 'Non superare il numero massimo di file consentito: {maxFiles}',
  code: TOTAL_FILES_SIZE_EXECEEDED,
  placeholder: 'maxFiles',
};
export const INVALID_TYPE_MESSAGE = {
  message: 'Il tipo di file inserito non è un valido formato: {accept}',
  code: INVALID_TYPE,
  placeholder: 'accept',
};

export const formatErrorFile = (errorMessage, maxDimension, maxFiles, accept) => {
  const errorFileMessage = [];
  for (let error of errorMessage.values()) {
    switch (error.code) {
      case FILE_LIMIT_EXECEEDED:
        errorFileMessage.push(error.message.replace(`{${error.placeholder}}`, maxDimension));
        break;
      case TOTAL_FILES_SIZE_EXECEEDED:
        errorFileMessage.push(error.message.replace(`{${error.placeholder}}`, maxFiles));
        break;
      case INVALID_TYPE:
        errorFileMessage.push(error.message.replace(`{${error.placeholder}}`, accept));
        break;
      default:
      // code block
    }
  }
  return errorFileMessage.join(', ');
};
