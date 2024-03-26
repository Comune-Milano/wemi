/** @format */

import React from 'react';
import { withRouter } from 'react-router-dom';
import Modal from 'components/ui2/Modal';
import Text from 'components/ui/Text';
import Button from 'components/ui2/Button';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { SendCandidacyRequest } from './graphql/SendCandidacyRequest';

const ModaleInvioCandidatura = ({
  openForwardsModal,
  setOpenForwardsModal,
  idLavoratore,
  setOpenConfirmModal,
}) => {
  const [, inoltraRichiestaCandidatura] = useGraphQLRequest(
    undefined,
    SendCandidacyRequest,
    undefined,
    false
  );
  const title = 'Prenotazione appuntamento per colloquio';
  const url = '';
  const children = (
    <>
      <Text
        intlFormatter
        value="Per completare l'iter di candidatura devi prenotare un colloquio con un operatore WeMi presso uno degli spazi WeMi."
        size="f7"
        padding="0 0.2rem 0 0"
        tag="p"
        align="center"
      />
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '3rem 0 0 0' }}>
        <Button
          autowidth
          label="Prenota l'appuntamento"
          fontSize="f7"
          onClick={async () => {
            await inoltraRichiestaCandidatura({ idLavoratore });
            window.open(url, 'WeMi');
            setOpenForwardsModal(false);
            setOpenConfirmModal(true);
          }}
          color="primary"
          margin="0 0.5rem 0 0"
        />
      </div>
    </>
  );

  return (
    <>
      <Modal
        open={openForwardsModal}
        setOpenModal={setOpenForwardsModal}
        title={title}
        color="primary"
        fontSize="f6"
      >
        {children}
      </Modal>
    </>

  );
};
ModaleInvioCandidatura.displayName = 'ModaleInvioCandidatura';

export default withRouter(ModaleInvioCandidatura);
