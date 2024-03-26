import { useLogger } from 'services/Logger';
import { useDispatch } from 'react-redux';
import { setWeMiError } from 'redux-modules/actions/errorActions';
import { getErrorDTO } from './transformers/errorDTOTransformer';

export const useErrorManager = () => {
  // The application logger.
  const logger = useLogger();

  // The redux dispatcher.
  const dispatch = useDispatch();

  /**
   * Handles any application error.
   * @param {*} error
   */
  const handleError = error => {
    // Log the error (this will only work in dev environment).
    logger.error('The following error occurred: ', error);

    // Get the error information DTO.
    const errorInformationDTO = getErrorDTO(error);
    logger.error('The computed error DTO is: ', errorInformationDTO);

    // Dispatch an action to set the error in our redux store
    // if the default management should not be prevented.
    if (!errorInformationDTO.preventDefaultManagement) {
      dispatch(setWeMiError(errorInformationDTO));
    } else {
      throw errorInformationDTO;
    }
  };

  return { handleError };
};
