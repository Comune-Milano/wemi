/** @format */

import React, { useState } from 'react';
import { connect } from 'react-redux';
import Text from 'components/ui/Text';
import { Row, Column } from 'components/ui/Grid';
import Modal from 'components/ui2/Modal';
import styled, { css } from 'styled-components';
import media from 'utils/media-queries';
import Button from 'components/ui2/Button';

const StyledHeader = styled.div`
  box-sizing: border-box;
  padding: 6em 4em 0;
  margin: 0;
  width: 100%;
`
StyledHeader.displayName = 'StyledHeader';

const CheckAddressModal = ({ open, setOpen, addressInputRef, redirect, setRedirect, pathname }) => {

  return (
    <>
      <Modal
        title="Non hai inserito nessun indirizzo!"
        fontSize="f6"
        open={open}
        setOpenModal={setOpen}
        color="primary">
        <Row fluid justifycontent="center">
          <Text
            tag="p"
            size="f7"
            value={"Gli enti del sistema WeMi operano su specifiche aree territoriali."}
            padding="1em 0"
            align="center"
          />
          <Text
            tag="p"
            size="f7"
            weight="bold"
            value={"Ti consigliamo di inserire l'indirizzo presso il quale vuoi che il servizio venga effettuato per restringere la ricerca agli enti che possono garantirne l'erogazione."}
            padding="1em 0"
            align="center"
          />
          <Text
            tag="p"
            size="f7"
            value={"Se preferisci, puoi comunque inoltrare la tua richiesta senza inserire l'indirizzo, filtrando in un secondo momento in base alle disponibilità che riceverai."}
            padding="1em 0"
            align="center"
          />
        </Row>
        <Row fluid justifycontent="center" margin="1em 0 5em 0">
          <Column flex justifycontent="center" xs="12" sm="6" padding="1em 0 0 0" sizepadding={{sm: "1em 0.5em 0 10%"}} >
            <Button
              width="90%"
              fontSize="f6"
              label="Inserisci indirizzo"
              color="primary"
              onClick={() => {
                setOpen(!open);
              }
              }
            />
          </Column>
          <Column flex justifycontent="center" xs="12" sm="6" padding="1.5em 0 0 0" sizepadding={{sm: "1em 10% 0 0.5em"}} >
            <Button
              width="90%"
              fontSize="f6"
              label="Procedi comunque"
              color="primary"
              onClick={() => {
                setOpen(!open);
                setRedirect(true)
              }}
            />
          </Column>
        </Row>
      </Modal>
    </>
  )
};

CheckAddressModal.displayName = 'CheckAddressModal';

const mapStoreToProps = store => ({
  datiEnte: store.graphql.EstraiDettaglioAmministrativoServizioEnte,
  locale: store.locale,
});
export default connect(mapStoreToProps)(CheckAddressModal);
