/** @format */

import React from 'react';
import { withRouter } from 'react-router-dom';
import Modal from 'components/ui2/Modal';
import Text from 'components/ui/Text';
import Button from 'components/ui2/Button';
import { PAGE_AREAPERSONALE_URL } from 'types/url';

const ModaleConfermaCandidatura = ({
  openConfirmModal,
  setOpenConfirmModal,
  history
}) => {


  const title = 'La tua candidatura è stata inviata';

  const children = (
    <>
      <Text
        intlFormatter
        value='Gli operatore WeMi hanno ricevuto la tua richiesta di candidatura ed a breve verrai contattato per confermare il tuo colloquio. Hai ricevuto una mail con i dettagli della tua candidatura.'
        size="f7"
        padding="0 0.2rem 0 0"
        tag="p"
        align="center"
      />
      <div style={{ width: "100%", display: "flex", justifyContent: "center", margin: "3rem 0 0 0" }}>
        <Button
          autowidth
          label='Visualizza il tuo menù lavoratore'
          onClick={() => {
            setOpenConfirmModal(false);
            history.push(PAGE_AREAPERSONALE_URL);
          }}
          fontSize='f7'
          color="primary"
          margin='0 0.5rem 0 0'
        />
      </div>
    </>
  )

  return (
    <>
      <Modal open={openConfirmModal}
        setOpenModal={setOpenConfirmModal}
        title={title}
        children={children}
        color="primary"
        fontSize="f6"
      />
    </>

  );
}
ModaleConfermaCandidatura.displayName = 'ModaleConfermaCandidatura';

export default (withRouter(ModaleConfermaCandidatura));