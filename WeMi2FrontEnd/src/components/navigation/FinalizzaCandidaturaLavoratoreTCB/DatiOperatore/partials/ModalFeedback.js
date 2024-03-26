/** @format */

import React from 'react';
import { withRouter, generatePath } from 'react-router-dom';
import Modal from 'components/ui2/Modal';
import Button from 'components/ui2/Button';
import Text from 'components/ui/Text';
import { useEventBus } from 'hooks/eventBus/useEventBus';
import styled from "styled-components";
import { PAGE_FEEDBACK_LAVORATORE_ADMIN_URL } from 'types/url';

const DivButtons = styled.div`
width: 100%; 
display: flex;
justify-content: center; 
margin: 3rem 0 0 0;
`;

const ModalFeedback = ({
  openModal,
  setOpenModal,
  idRichiesta,
  idLavoratore,
  history,
  location,
}) => {

  const eventBus = useEventBus();

  const redirectFeedback = (salvataggio) => {

    const constPathFeedback = generatePath(PAGE_FEEDBACK_LAVORATORE_ADMIN_URL, { idRichiesta });

    if (salvataggio) {
      eventBus.publish('SALVA_E_REDIREZIONA', { pathname: constPathFeedback, state: location.state });
    } else {
      history.push({ pathname: constPathFeedback, state: location.state });
    };
  };

  const title = 'Gestione Feedback';

  const children = (
    <>
      <Text
        intlFormatter
        value="Si desidera salvare i dati inseriti?"
        size="f7"
        padding="0 0.2rem 0 0"
        tag="p"
        align="center"
      />
      <DivButtons>
        <Button
          autowidth
          label="salva e procedi"
          onClick={() => redirectFeedback(true)}
          fontSize='f7'
          color="primary"
          margin='0 0.5rem 0 0'
        />
        <Button
          autowidth
          label="procedi senza salvare"
          fontSize='f7'
          color="primary"
          margin='0 0 0 0.5rem'
          onClick={() => { redirectFeedback() }}
        />
      </DivButtons>
    </>
  )

  return (
    <>
      <Modal
        open={openModal}
        setOpenModal={setOpenModal}
        title={title}
        children={children}
        color="primary"
        fontSize="f6"
      />
    </>

  );
}
ModalFeedback.displayName = 'ModalFeedback';

export default (withRouter(ModalFeedback));