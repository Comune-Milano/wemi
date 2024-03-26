import React from 'react';
import Modal from 'components/ui2/Modal';
import { BodyModalFilesSizeExeceeded } from './BodyModalFilesSizeExeceeded';

export const ModalFilesSizeExeceeded = ({ openModal, setOpenModal, remainingSpace }) => {

  const handleCloseButtonClick = React.useCallback((value) => {
    setOpenModal(value);
  }, [setOpenModal]);

  return (
    <Modal
      open={openModal}
      setOpenModal={setOpenModal}
      title="ERRORE"
      color="red"
      fontSize="f6"
      minHeight="auto"
    >
      <BodyModalFilesSizeExeceeded handleCloseButtonClick={handleCloseButtonClick} remainingSpace={remainingSpace} />
    </Modal>
  );
};

ModalFilesSizeExeceeded.displayName = 'ModalFilesSizeExeceeded';
