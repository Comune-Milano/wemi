import React from 'react';
import { Column, Row } from 'components/ui/Grid';
import Button from 'components/ui2/Button';
import Modal from 'components/ui2/Modal';
import Text from 'components/ui/Text';


const ErrorModal = ({
  modalVisible,
  setModalVisible,
  error,
}) => {
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
          value={`${error.message} (${error.identifier})`}
          whitespace="pre-wrap"
        />
      </Column>
      <Column
        flex
        xs="12"
        justifycontent="center"
        padding="1rem 0"
      >
        <Button
          autowidth
          label="Ho Capito"
          color="red"
          onClick={() => setModalVisible(false)}
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
      setOpenModal={() => {
        setModalVisible(false);
      }}
      title={error.title}
      color="red"
      fontSize="f6"
      minHeight="auto"
    >
      {modalBody}
    </Modal>
  );
};
ErrorModal.displayName = 'Modal to display errors';
export default ErrorModal;
