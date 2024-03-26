import React from 'react';
import Modal from 'components/ui2/Modal';
import Text from 'components/ui/Text';
import Button from 'components/ui2/Button';
import { isFunction } from 'utils/functions/typeCheckers';


const SuccessModalImpl = ({ open, setOpenSuccessModal, message, callback }) => {
  
  const Children = ({ message, closeModal, callback }) => (
    <>
      <Text
        intlFormatter
        value={message}
        size="f7"
        padding="0 0.2rem 0 0"
        tag="p"
        align="center"
      />
      <div style={{ width: "100%", display: "flex", justifyContent: "center", margin: "3rem 0 0 0" }}>
        <Button
          autowidth
          label='OK'
          onClick={() => {
            closeModal(false);
            if(callback && isFunction(callback)){
              callback();
            }
          }}
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
          setOpenModal={setOpenSuccessModal}
          title="Operazione avvenuta con successo"
          fontSize="f6"
          color="green"
          children={<Children message={message} closeModal={setOpenSuccessModal} callback={callback} />}
        />


        : null}
    </>
  );
};

SuccessModalImpl.displayName = 'Modale di errore';

export const SuccessModal = SuccessModalImpl;