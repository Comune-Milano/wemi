import React from 'react';
import Modal from 'components/ui2/Modal';
import Text from 'components/ui/Text';
import { Row } from 'components/ui/Grid';

const ModalError = ({
  open,
  setOpenModal,
  messageError = 'I file appena allegati superano la dimensione massima di 7,7 MB',
}) => (
  <Modal
    open={open}
    setOpenModal={setOpenModal}
    title="Attenzione"
    color="red"
    fontSize="f6"
  >
    <Row fluid flex alignitems="center" justifycontent="center">
      <Text
        value={messageError}
        size="f7"
      />
    </Row>
  </Modal>
);

ModalError.displayName = 'ModalError';

export default ModalError;
