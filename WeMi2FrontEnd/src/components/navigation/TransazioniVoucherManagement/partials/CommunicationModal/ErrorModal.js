import React from 'react';
import Modal from 'components/ui2/Modal';
import Text from 'components/ui/Text';


const ErrorModalImpl = ({ open, setOpenErrorModal }) => {
  const Children = () => (
    <>
      <Text
        intlFormatter
        color="red"
        value="Si sono verificati degli errori durante l'operazione sul voucher. Contattare gli amministratori del Sistema."
        size="f7"
        padding="0 0.2rem 0 0"
        tag="p"
        align="left"
      />
    </>
  );
  Children.displayName = 'ErrorMessage';

  return (
    <>
      {open ?
        (
          <Modal
            open={open}
            setOpenModal={setOpenErrorModal}
            title="Attenzione!"
            fontSize="f6"
            color="red"
            children={<Children />}
          />
        )
        : null}
    </>
  );
};

ErrorModalImpl.displayName = 'Modale di errore';

export const ErrorModal = ErrorModalImpl;
