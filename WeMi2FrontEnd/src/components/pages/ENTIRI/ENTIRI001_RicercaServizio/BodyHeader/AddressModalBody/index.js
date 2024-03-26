/** @format */

import React, { useState } from 'react';
import styled from 'styled-components';

import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Button from 'components/ui2/Button';

const StyledHeader = styled.div`
  box-sizing: border-box;
  padding: 6em 4em 0;
  margin: 0;
  width: 100%;
`
StyledHeader.displayName = 'StyledHeader';

const AddressModalBody = ({
  closeModal,
  addressInputRef,
  handleForward,
}) => (
  <>
    <Row fluid justifycontent="center">
      <Text
        tag="p"
        size="f7"
        value={`Inserendo l'indirizzo presso il quale vuoi che il servizio venga effettuato e le altre informazioni della sezione "Personalizza la richiesta", il sistema WeMi ti proporà gli enti che possono rispondere al meglio alle tue necessità.`}
        padding="1em 0"
        align="center"
        weight="bold"
      />
      <Text
        tag="p"
        size="f7"
        value="Se preferisci, puoi comunque inoltrare la tua richiesta senza inserire altre informazioni, filtrando in un secondo momento in base alle disponibilità che riceverai dagli enti contattati."
        padding="1em 0"
        align="center"
      />
    </Row>
    <Row fluid justifycontent="center" margin="1em 0 5em 0">
      <Column flex justifycontent="center" xs="12" sm="6" padding="1em 0 0 0" sizepadding={{sm: "1em 0.5em 0 10%"}} >
        <Button
          width="100%"
          fontSize="f7"
          label="Personalizza la richiesta"
          color="primary"
          onClick={() => {
            closeModal();
          }
          }
        />
      </Column>
      <Column flex justifycontent="center" xs="12" sm="6" padding="1.5em 0 0 0" sizepadding={{sm: "1em 10% 0 0.5em"}} >
        <Button
          width="100%"
          fontSize="f7"
          label="Procedi comunque"
          color="primary"
          onClick={handleForward}
        />
      </Column>
    </Row>
  </>
);

AddressModalBody.displayName = 'CheckAddressModal';

export default (AddressModalBody);
