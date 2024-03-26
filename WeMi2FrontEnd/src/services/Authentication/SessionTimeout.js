import React from 'react';
import Button from 'components/ui2/Button';
import Modal from 'components/ui2/Modal';
import Text from 'components/ui/Text';
import { Column, Row } from 'components/ui/Grid';

const SessionTimeoutComponent = ({ open }) => {

  const callback = () => {
    window.location.href = '/logout';
  };

  const Body = (
    <>
      <Row margin="0" padding="0">
        <Column xs="12" padding="0 2rem">
          <Text
            value="La tua sessione è scaduta. Ripeti di nuovo il login per avere accesso alle funzionalità WeMi a te dedicate."
            size="f7"
            align="center"
            tag="div"
          />
        </Column>
        <Column
          flex
          xs="12"
          justifycontent="center"
          padding="1.6rem 0 0"
        >
          <Button
            label="CAPITO"
            onClick={callback}
            autowidth
            fontSize="f7"
            color="primary"
            padding="0.4rem 2rem"
            margin="0"
          />
        </Column>
      </Row>
    </>
  );

  return (
    <Modal
      open={open}
      setOpenModal={callback}
      title="Sessione scaduta"
      color="primary"
      fontSize="f6"
    >
      {Body}
    </Modal>
  );
};

SessionTimeoutComponent.displayName = 'SessionTimeoutComponent';

export const SessionTimeout = SessionTimeoutComponent;
