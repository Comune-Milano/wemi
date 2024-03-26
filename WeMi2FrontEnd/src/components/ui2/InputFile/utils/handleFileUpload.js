
import { MAXIMUM_FILE_SIZE } from 'components/navigation/FinalizzaCandidaturaLavoratoreTCB/DatiOperatore/utils/constants';
import { DEFAULT_MAX_SIZE } from './constants';
import {
  FILE_LIMIT_EXECEEDED, TOTAL_FILES_SIZE_EXECEEDED, INVALID_TYPE,
  FILE_LIMIT_EXECEEDED_MESSAGE, TOTAL_FILES_SIZE_EXECEEDED_MESSAGE, INVALID_TYPE_MESSAGE
} from './errors';


export const handleFileUpload = (event, maxDimension, accept, onChange, onError, allFiles) => {
  const choosenFiles = event.target.files;
  const errors = new Set();
  const errorMessage = new Set();
  const maxFileSize = maxDimension || DEFAULT_MAX_SIZE;
  Object.values(choosenFiles).forEach(element => {
    if (!element.type.match(accept)) {
      errors.add(INVALID_TYPE);
      errorMessage.add(INVALID_TYPE_MESSAGE);
    }
    if (element.size > maxFileSize) {
      errors.add(FILE_LIMIT_EXECEEDED);
      errors.add({
        size: element.size,
        name: Object.values(choosenFiles)[0].name || 'nome file',
      });
      errorMessage.add(FILE_LIMIT_EXECEEDED_MESSAGE);
    }
    if (allFiles?.length) {
      if ((element.size + allFiles.reduce((previous, next) => previous + next.size, 0) > MAXIMUM_FILE_SIZE)) {
        errors.add(TOTAL_FILES_SIZE_EXECEEDED);
        errorMessage.add(TOTAL_FILES_SIZE_EXECEEDED_MESSAGE);
      }
    }
  });
  if (errors.size > 0) {
    onError(errors, errorMessage);
  } else {
    onChange([...choosenFiles]);
  }
};
