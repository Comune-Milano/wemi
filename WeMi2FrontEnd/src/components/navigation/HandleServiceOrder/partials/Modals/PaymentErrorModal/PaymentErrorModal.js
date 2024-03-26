
import React from 'react';
import Modal from 'components/ui2/Modal';
import { Row, Column } from 'components/ui/Grid';
import Button from 'components/ui2/Button';
import Text from 'components/ui/Text';

/**
 * The base modal to show when an error occurs in the payment flow.
 */
export const PaymentErrorModal = ({
  title,
  errorMessage,
  modalVisible,
  setModalVisible,
}) => {
  /**
   * INNER COMPONENTS
   */

  const modalBody = (
    <Row fluid justifycontent="center" padding="0">
      <Column
        xs="12"
        justifycontent="center"
        padding="0 0 1rem 0"
      >
        <Text
          tag="p"
          size="f7"
          align="center"
          value={errorMessage}
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
          label="Chiudi"
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
      setOpenModal={visible => setModalVisible(visible)}
      title={title}
      color="red"
      fontSize="f6"
      minHeight="auto"
    >
      {modalBody}
    </Modal>
  );
};

PaymentErrorModal.displayName = 'PaymentErrorModal';
