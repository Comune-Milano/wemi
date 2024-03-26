/** @format */

import React from 'react';
import Text from 'components/ui/Text';
import Modal from 'components/ui2/Modal';

const ModalRichiestaAnnullamento = ({
  open,
  setOpen,
  title = "Richiesta Annullamento domanda TCB"
}) => {

  const children = (
    <>
      <Text
        intlFormatter
        value="La tua richiesta di annullo è stata inoltrata agli operatori WeMi che provvederenno ad annullarla"
        size="f7"
        padding="0 0.2rem 0 0"
        tag="p"
        align="center"
      />
    </>
  )

  return (
    <>
      <Modal open={open}
        setOpenModal={setOpen}
        title={title}
        children={children}
        color="primary"
        fontSize="f6"
      />
    </>

  );
}
ModalRichiestaAnnullamento.displayName = 'ModalRichiestaAnnullamento';

export default (ModalRichiestaAnnullamento);