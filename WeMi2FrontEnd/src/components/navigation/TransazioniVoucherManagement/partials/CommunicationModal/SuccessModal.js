import React from 'react';
import Modal from 'components/ui2/Modal';
import Text from 'components/ui/Text';

const SuccessModalImpl = ({ open, setOpenSuccessModal, message }) => {
  const Children = ({ message }) => (
    <>
      <Text
        intlFormatter
        value={message}
        size="f7"
        padding="0 0.2rem 0 0"
        tag="p"
        align="center"
      />
    </>
  );
  Children.displayName = 'SuccesMessage';

  return (
    <>
      {open ?
        (
          <Modal
            open={open}
            setOpenModal={setOpenSuccessModal}
            title="Operazione avvenuta con successo"
            fontSize="f6"
            color="primary"
            children={<Children message={message} />}
          />
        )


        : null}
    </>
  );
};

SuccessModalImpl.displayName = 'Modale di successo';

export const SuccessModal = SuccessModalImpl;
