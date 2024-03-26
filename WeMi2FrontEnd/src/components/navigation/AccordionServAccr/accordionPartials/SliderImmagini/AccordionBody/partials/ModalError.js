import React from 'react';
import Modal from 'components/ui2/Modal';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';

const ModalError = ({
  openModal,
  setOpenModal,
  nomeFile = 'nome file',
  dimensioneFile = 'dimensione file',
}) => (
  <Modal
    open={openModal}
    setOpenModal={setOpenModal}
    title="Attenzione"
    color="red"
    fontSize="f6"
    paddingTopTitle="2rem"
    width="50%"
  >
    <Row>
      <Text
        value={`Attenzione, la dimensione dell'immagine ${nomeFile} è di ${dimensioneFile} e supera il limite massimo consentito per il caricamento di una immagine su WeMi che è di 7MB`}
        size="f6"
      />
    </Row>
  </Modal>
);

ModalError.displayName = 'ModalError';

export default ModalError;
