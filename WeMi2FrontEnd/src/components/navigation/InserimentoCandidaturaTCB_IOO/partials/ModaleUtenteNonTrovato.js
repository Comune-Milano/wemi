/** @format */

import React from 'react';
import { withRouter } from 'react-router-dom';
import Modal from 'components/ui2/Modal';
import Button from 'components/ui2/Button';
import Text from 'components/ui/Text';

const ModaleUtenteNonTrovato = ({
  open,
  setOpenModal,
  dataset,
  history,
}) => {
  const title = 'UTENTE NON CENSITO IN WEMI';
  const children = (
    <>
      <Text
        intlFormatter
        value={`Ci risulta che ${dataset.username || dataset.codicefiscaleRicerca} non sia censito in WeMi. Per poter procedere con l'inserimento della candidatura è necessario fornire un codice utente o codice fiscale presente su WeMi o censito sul comune di Milano.`}
        size="f7"
        padding="0 0.2rem 0 0"
        tag="p"
        align="center"
      />
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '3rem 0 0 0' }}>
        <Button
          autowidth
          label="TORNA ALLA CANDIDATURA"
          onClick={() => setOpenModal(false)}
          fontSize="f7"
          color="primary"
          margin="0 0.5rem 0 0"
        />
        <Button
          autowidth
          label="Esci"
          onClick={() => history.goBack()}
          fontSize="f7"
          color="red"
          margin="0 0 0 0.5rem"
        />
      </div>
    </>
  );

  return (
    <>
      {open ? (
        <Modal
          open={open}
          setOpenModal={setOpenModal}
          title={title}
          color="primary"
          fontSize="f6"
        >
          {children}
        </Modal>
      )
        :
        null
      }
    </>

  );
};
ModaleUtenteNonTrovato.displayName = 'ModaleUtenteNonTrovato';

export default (withRouter(ModaleUtenteNonTrovato));
