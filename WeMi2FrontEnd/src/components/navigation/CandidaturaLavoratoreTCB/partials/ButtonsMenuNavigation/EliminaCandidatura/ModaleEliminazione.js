/** @format */

import React from 'react';
import { withRouter, generatePath } from 'react-router-dom';
import { DeleteCandidacyMutation } from './graphql/DeleteCandidacy';
import Modal from 'components/ui2/Modal';
import Button from 'components/ui2/Button';
import Text from 'components/ui/Text';
import NavLink from 'components/router/NavLink';
import { useAuthGraphQLRequest } from 'hooks/authRequest/useAuthGraphQLRequest';
import { PAGE_MENUTCB_URL, PAGE_TCB_ADMIN_ECA_001 } from 'types/url';

const ModaleEliminazione = ({
  openElimina,
  setOpenElimina,
  logger,
  idOperatore,
  idLavoratore,
  history
}) => {
  /**
   * Request to start the remove candidacy onto the backend
   */
  const [_, RimuoviCandidatura] = useAuthGraphQLRequest(
    undefined,
    DeleteCandidacyMutation,
    undefined,
    false
  );

  const title = 'Confermi di voler eliminare i dati inseriti?';

  const children = (
    <>
      <Text
        intlFormatter
        value='I dati inseriti verranno rimossi e non sarà possibile recuperarli'
        size="f7"
        padding="0 0.2rem 0 0"
        tag="p"
        align="center"
      />
      <div style={{ width: "100%", display: "flex", justifyContent: "center", margin: "3rem 0 0 0" }}>
        <Button
          autowidth
          label='TORNA ALLA CANDIDATURA'
          onClick={() => setOpenElimina(false)}
          fontSize='f7'
          color="primary"
          margin='0 0.5rem 0 0'
        />
        <Button
          autowidth
          label='ELIMINA DATI'
          onClick={async () => {
            try {
              await RimuoviCandidatura({ idLavoratore: idLavoratore }).then(() => {
                if (idOperatore) {
                  history.push(generatePath(PAGE_TCB_ADMIN_ECA_001, { idOperatore }));
                } else {
                  history.push(PAGE_MENUTCB_URL);
                }
              });
            }
            catch (error) {
              logger.log(error);
              //TODO gestione errore
            }
          }}
          fontSize='f7'
          color="red"
          margin='0 0 0 0.5rem'
        />
      </div>
    </>
  )

  return (
    <>
      <Modal open={openElimina}
        setOpenModal={setOpenElimina}
        title={title}
        children={children}
        color="primary"
        fontSize="f6"
        marginTop="15rem"
      />
    </>

  );
}
ModaleEliminazione.displayName = 'ModaleEliminazione';

export default (withRouter(ModaleEliminazione));