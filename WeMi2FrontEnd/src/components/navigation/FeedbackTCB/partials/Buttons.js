import React from 'react';
import Button from 'components/ui2/Button';
import { Row } from 'components/ui/Grid';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import {
  InserisciFeedbackTCB as InserisciFeedbackTCBQ,
} from 'components/navigation/FeedbackTCB/graphql/inseriscifeedbackTCB';
import { withRouter, generatePath } from 'react-router';
import { PAGE_TCB_ADMIN_ERI_001, PAGE_REQUESTSINDEX_URL } from 'types/url';
import { useFormContext } from 'libs/Form/hooks/useFormContext';

const ButtonsComponent = ({ getRecensione, isAdmin, isRilasciato, idRichiesta, history, datiLogin }) => {
  const { dataset } = useFormContext();

  const setTCB = useStatelessGraphQLRequest(InserisciFeedbackTCBQ);

  const confermafeedback = async () => {
    const {
          valutazioneGenerale,
          valutazioneVelocita,
          valutazioneFacilità,
          valutazioneAdeguatezza,
          scriviNota,
    } = dataset;

    await setTCB({
      input: {
        id_rich_serv_rec: idRichiesta,
        js_dati_recensione: {
          valutazioneGenerale,
          velocitaRisposta: valutazioneVelocita,
          facilitaUtilizzo: valutazioneFacilità,
          adeguatezzaProfilo: valutazioneAdeguatezza,
          txtRecensione: scriviNota,
        },
      },
    });
    await getRecensione({
      id_rich_serv_rec: idRichiesta,
    });
  };

  if (isAdmin || isRilasciato) {
    return (
      <Row fluid justifycontent="flex-end" padding="2em 0">
        <Button
          autowidth
          submit
          label="ESCI"
          name="ESCI"
          fontSize="f6"
          color="primary"
          onClick={() => {
            if (isAdmin) {
              const pathAdminEri = generatePath(PAGE_TCB_ADMIN_ERI_001, {
                idOperatore: datiLogin.idCittadino,
              });
              history.push(pathAdminEri);
            } else {
              history.push(PAGE_REQUESTSINDEX_URL);
            }
          }}
          padding="0.4em 2.5em"
        />
      </Row>
    );
  }

  return (
    <Row fluid justifycontent="flex-end" padding="2em 0">
      <Button
        autowidth
        submit
        label="CONFERMA RECENSIONE"
        name="CONFERMA RECENSIONE"
        fontSize="f6"
        color="primary"
        onClick={() => {
          confermafeedback();
        }}
        padding="0.4em 2.5em"
      />
    </Row>

  );
};

ButtonsComponent.displayName = 'Buttons rating wemi';

export const Buttons = withRouter(ButtonsComponent);
