/** @format */

import React, { useEffect } from 'react';
import Modal from 'components/ui2/Modal';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { estraiRichiestaEnteModaleInfo as estraiRichiestaEnteModaleInfoQ } from './ModaleInfoRichiestaGraphQL';
import ModaleInfoRichiestaHeader from './partials/ModaleInfoRichiestaHeader';
import ModaleInfoRichiestaBody from './partials/ModaleInfoRichiestaBody';

const ModaleInfoRichiesta = ({ openModal, setOpenModal, idRichiestaServizioEnte }) => {
  const [richiestaEnte, performRequestEstraiRichiestaEnte] = useGraphQLRequest(
    null,
    estraiRichiestaEnteModaleInfoQ,
    null,
    false,
  );

  useEffect(() => {
    if (openModal && idRichiestaServizioEnte) {
      performRequestEstraiRichiestaEnte({ idRichiestaEnte: idRichiestaServizioEnte });
    }
  }, [openModal, idRichiestaServizioEnte]);

  const loaded = !richiestaEnte.pristine && !richiestaEnte.isLoading && !richiestaEnte.errored;

  return (
    <Modal
      customModal
      open={openModal}
      header={() => openModal && loaded ? <ModaleInfoRichiestaHeader richiestaEnte={richiestaEnte.data} /> : null}
      setOpenModal={setOpenModal}
      color="primary"
      width="90%"
      mobileFullScreen="true"
    >
      {openModal && loaded ? <ModaleInfoRichiestaBody richiestaEnte={richiestaEnte.data} /> : null}
    </Modal>
  );
};

ModaleInfoRichiesta.displayName = 'ModaleInfoRichiesta';
export default ModaleInfoRichiesta;
