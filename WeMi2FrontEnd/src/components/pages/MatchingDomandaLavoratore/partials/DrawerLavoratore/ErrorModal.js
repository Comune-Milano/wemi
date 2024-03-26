import React from 'react';
import Modal from 'components/ui2/Modal';
import Text from 'components/ui/Text';
import Button from 'components/ui2/Button';


const ErrorModalImpl = ({ open, setOpenErrorModal, message }) => {
  
  const Children = ({ message, closeModal }) => (
    <>
      <Text
        intlFormatter
        value="E' avvenuto un errore"
        size="f7"
        padding="0 0.2rem 0 0"
        tag="p"
        align="center"
      />
      <div style={{ width: "100%", display: "flex", justifyContent: "center", margin: "3rem 0 0 0" }}>
        <Button
          autowidth
          label='OK'
          onClick={() => closeModal(false)}
          fontSize='f7'
          color="green"
          margin='0 0.5rem 0 0'
        />
      </div>
    </>
  );
  
  return (
    <>
      {open ?
        <Modal
          open={open}
          setOpenModal={setOpenErrorModal}
          title="Errore"
          fontSize="f6"
          color="green"
          children={<Children message={message} closeModal={setOpenErrorModal} />}
        />


        : null}
    </>
  );
};

ErrorModalImpl.displayName = 'Modale di errore';

export const ErrorModal = ErrorModalImpl;