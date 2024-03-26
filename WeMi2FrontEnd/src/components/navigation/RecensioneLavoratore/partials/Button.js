/** @format */

import React from 'react';
import { withRouter, generatePath } from 'react-router-dom';
import checkAdmin from 'utils/functions/checkAdmin';
import {
  UpdateCdStatoRec as UpdateCdStatoRecQ,
  ConfermaRecensione as ConfermaRecensioneQ,
} from 'components/navigation/RecensioneLavoratore/RecLavoratoreGraphQL';
import { CONFERMATO, RICHIESTO, RILASCIATO } from 'types/statoRecensioneCostants';
import checkCittadino from 'utils/functions/checkCittadino';
import { PAGE_REQUESTSINDEX_URL, PAGE_FINALIZZA_CANDIDATURA_TCB_ADMIN_URL, PAGE_TCB_ADMIN_ERI_001 } from 'types/url';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import { createJsonDiConferma } from './utils/createJsonDiConferma';
import ButtonsRichiesto from './subPartials/ButtonsRichiesto';
import ButtonsConfermato from './subPartials/ButtonsConfermato';
import ButtonsRilasciato from './subPartials/ButtonsRilasciato';
import ButtonsNotStatoRecensione from './subPartials/ButtonsNotStatoRecensione';

const Buttons = ({
  match,
  history,
  qtMediaSingolaRecensione,
  datiLogin,
  isFromBackoffice,
  location,
}) => {
  const { dataset } = useFormContext();

  const id_rich_serv_rec = parseInt(match.params.idRichiesta, 10);

  const updateRecensione = useStatelessGraphQLRequest(UpdateCdStatoRecQ);

  const confermaRec = useStatelessGraphQLRequest(ConfermaRecensioneQ);

  const isAdmin = checkAdmin(datiLogin);
  const isCittadino = checkCittadino(datiLogin);

  const setRedirect = () => {
    if (isAdmin) {
      if (isFromBackoffice) {
        const pathname = generatePath(PAGE_TCB_ADMIN_ERI_001, { idOperatore: getObjectValue(datiLogin, 'idCittadino', '') });
        history.push({
          pathname,
          state: location.state,
        });
      } else {
        const pathname = generatePath(PAGE_FINALIZZA_CANDIDATURA_TCB_ADMIN_URL, { idLavoratore: dataset.idLavoratore });
        history.push({
          pathname,
          state: location.state,
        });
      }
    }
    if (isCittadino) {
      history.push(PAGE_REQUESTSINDEX_URL);
    }
    // redirect per il lavoratore ancora da decidere
  };

  const callConfermaRec = () => {
    confermaRec(createJsonDiConferma(
      id_rich_serv_rec,
      dataset,
      qtMediaSingolaRecensione,
      isAdmin ? CONFERMATO : RILASCIATO
    ));
    setRedirect();
  };


  const callUpdateRec = () => {
    updateRecensione({
      id_rich_serv_rec,
      cd_stato_rec: RICHIESTO,
    });
    setRedirect();
  };


  return (
    <>
      {dataset.statoRecensione === RICHIESTO ?
        <ButtonsRichiesto callConfermaRec={callConfermaRec} setRedirect={setRedirect} />
        : null}
      {
        dataset.statoRecensione === CONFERMATO ?
          <ButtonsConfermato setRedirect={setRedirect} />
          : null}
      {
        dataset.statoRecensione === RILASCIATO ? (
          <ButtonsRilasciato
            isAdmin={isAdmin}
            isCittadino={isCittadino}
            setRedirect={setRedirect}
            callConfermaRec={callConfermaRec}
            callUpdateRec={callUpdateRec}
          />
        ) : null}
      {!dataset.statoRecensione ? (
        <ButtonsNotStatoRecensione
          isAdmin={isAdmin}
          setRedirect={setRedirect}
          callConfermaRec={callConfermaRec}
        />
      )
        : null}
    </>
  );
};


Buttons.displayName = 'Buttons';

export default (withRouter(Buttons));
