/** @format */

import React from 'react';
import { withRouter, generatePath } from 'react-router-dom';
import Modal from 'components/ui2/Modal';
import Text from 'components/ui/Text';
import Button from 'components/ui2/Button';
import { PAGE_MENUTCB_URL, PAGE_TCB_ADMIN_ECA_001, PAGE_MATCHING_DOMANDA_LAVORATORE_URL } from 'types/url';
import { getObjectValue } from 'utils/extensions/objectExtensions';

const ModaleUscita = ({
  openUscita,
  setOpenUscita,
  history,
  idOperatore,
  location,
}) => {
  const title = 'Confermi di voler uscire?';

  const children = (
    <>
      <Text
        intlFormatter
        value="I dati inseriti non andranno persi: li ritroverai la prossima volta che tornerai alla richiesta di candidatura"
        size="f7"
        padding="0 0.2rem 0 0"
        tag="p"
        align="center"
      />
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '3rem 0 0 0' }}>
        <Button
          autowidth
          label="TORNA ALLA CANDIDATURA"
          onClick={() => { setOpenUscita(false); }}
          fontSize="f7"
          color="primary"
          margin="0 0.5rem 0 0"
        />
        <Button
          autowidth
          label="ESCI DALLA CANDIDATURA"
          onClick={() => {
            const idRichiesta = getObjectValue(location, 'state.idRichiesta', undefined);
            if (idRichiesta) {
              return history.push(generatePath(PAGE_MATCHING_DOMANDA_LAVORATORE_URL, { idDomanda: idRichiesta }));
            }
            if (idOperatore) {
              return history.push(generatePath(PAGE_TCB_ADMIN_ECA_001, { idOperatore }));
            }
            return history.push(PAGE_MENUTCB_URL);
          }}
          fontSize="f7"
          color="red"
          margin="0 0 0 0.5rem"
        />
      </div>
    </>
  );

  return (
    <>
      <Modal
        open={openUscita}
        setOpenModal={setOpenUscita}
        title={title}
        children={children}
        color="primary"
        fontSize="f6"
        marginTop="15rem"
      />
    </>

  );
};
ModaleUscita.displayName = 'ModaleUscita';

export default (withRouter(ModaleUscita));
