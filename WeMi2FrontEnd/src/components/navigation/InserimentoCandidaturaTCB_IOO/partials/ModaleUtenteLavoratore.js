/** @format */

import React from 'react';
import Modal from 'components/ui2/Modal';
import Text from 'components/ui/Text';

const ModaleUtenteLavoratore = ({
  open,
  setOpenModal,
}) => {

  const title = 'UTENTE NON VALIDO';
  const children = (
    <>
      <Text
        intlFormatter
        value="L'utente inserito è già lavoratore o ha altri incarichi."
        size="f7"
        padding="0 0.2rem 0 0"
        tag="p"
        align="center"
      />
    </>
  )

  return (
    <>
      {open ?
        <Modal
          open={open}
          setOpenModal={setOpenModal}
          title={title}
          children={children}
          color="red"
          fontSize="f6"
        />
        : null
      }
    </>

  );
}
ModaleUtenteLavoratore.displayName = 'ModaleUtenteLavoratore';

export default (ModaleUtenteLavoratore);