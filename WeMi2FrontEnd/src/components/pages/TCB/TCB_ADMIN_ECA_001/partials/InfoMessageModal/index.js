import React from 'react';
import Text from 'components/ui/Text';
import Modal from 'components/ui2/Modal';
import Button from 'components/ui2/Button';
import { Row } from 'components/ui/Grid';

const InfoMessageModal = ({ open, setOpen, title, message }) => (
  <Modal title={title} open={open} setOpenModal={setOpen} color="primary">
    <Row fluid>
      <Row fluid justifycontent="center">
        <Text
          intlFormatter
          tag="h3"
          value={message}
          color="black"
          transform="none"
          padding="0 0.2rem 0 0"
          size="f7"
        />
      </Row>
      <Row fluid justifycontent="center">
        <Button
          autowidth
          margin="3em 0 0 0"
          color="primary"
          label="Ok"
          value="Ok"
          fontSize="f6"
          onClick={() => setOpen(false)}
        />
      </Row>
    </Row>
  </Modal>
);

InfoMessageModal.displayName = 'InfoMessageModal';
export default InfoMessageModal;
