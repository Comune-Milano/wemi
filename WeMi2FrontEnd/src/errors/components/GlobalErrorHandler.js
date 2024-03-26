import React, { useState, useEffect, memo } from 'react';
import { useSelector } from 'react-redux';
import { errorDTOSelector } from 'redux-modules/selectors/errorDTOSelector';
import Modal from 'components/ui2/Modal';
import { Row, Column } from 'components/ui/Grid';
import Button from 'components/ui2/Button';
import Text from 'components/ui/Text';
import AnchorLink from 'components/ui/AnchorLink';
import { PAGE_HOME_URL } from 'types/url';
import { useHttpClient } from 'hooks/httpClient/useHttpClient';

export const GlobalErrorHandler = memo(() => {
  // The state for the visibility of the modal.
  const [modalVisible, setModalVisible] = useState(false);

  const { performHttpRequest } = useHttpClient();

  // The error information DTO from the global state.
  const errorInformationDTO = useSelector(errorDTOSelector);
  const { buttonText, showSendReport } = errorInformationDTO;

  /**
   * Handles the click on the closing button of the error modal.
   */
  const handleCloseButtonClick = () => {
    const { fatal } = errorInformationDTO;
    
    setModalVisible(false);
    /**
     * If the error is blocking, redirect to the homepage
     */
    if (fatal) {
      window.location.href = PAGE_HOME_URL;
    }
   
  };

  /**
   * Listen for any error to handle the modal visibility.
   */
  useEffect(
    () => {
      if (Object.keys(errorInformationDTO).length > 0) {
        setModalVisible(true);

        const { debugMessage, message, stacktrace  } = errorInformationDTO;
        const descriptionEntries = [
          ...(debugMessage ? [`Debug-Message: ${debugMessage}`] : []),
          ...(message ? [`Message: ${message}`] : []),
          ...(stacktrace ? [`Stacktrace: ${stacktrace}`] : []),
        ];

        performHttpRequest('errorlog', {
          body: JSON.stringify({
            description: descriptionEntries.join(' --- ')
          })
        })
        .catch(error => console.log('A problem occurred while sending the error to the backend.', error));
      }
    },
    [errorInformationDTO]
  );

  /**
   * INNER COMPONENTS
   */

  const modalBody = (
    <Row fluid justifycontent="center" padding="0">
      <Column
        xs="12"
        justifycontent="center"
        padding="0 0 0.4rem 0"
      >
        <Text
          tag="p"
          size="f7"
          align="center"
          value={`${errorInformationDTO.message} (${errorInformationDTO.identifier})`}
          whitespace="pre-wrap"
        />
      </Column>
      {showSendReport ? (
        <Column
          justifycontent="center"
          padding="0 0 1rem 0"
          flex
        >
          <AnchorLink
            to=""
            align="center"
          >
            <Text
              tag="p"
              size="f7"
              align="center"
              color="primary"
              weight="bold"
              decoration="underline"
              value="Invia segnalazione"
            />
          </AnchorLink>
        </Column>
      ) : null}
      <Column
        flex
        xs="12"
        justifycontent="center"
        padding="1rem 0"
      >
        <Button
          autowidth
          label={buttonText}
          color="red"
          onClick={handleCloseButtonClick}
        />
      </Column>
    </Row>
  );

  /**
   * end of INNER COMPONENTS
   */

  return (
    <Modal
      open={modalVisible}
      setOpenModal={visible => {
        setModalVisible(visible);
        handleCloseButtonClick();
      }}
      title={errorInformationDTO.title}
      color="red"
      fontSize="f6"
      minHeight="auto"
    >
      {modalBody}
    </Modal>
  );
});

GlobalErrorHandler.displayName = 'GlobalErrorHandler';
