import React from 'react';
import { withRouter } from 'react-router-dom';
import Wrapper from 'components/navigation/NavigationWrapper';
import { Redirect } from "react-router-dom";
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import {
  EstraiUtenteDomandaTCB as EstraiUtenteDomandaTCBQ,
  datiStepTCB as datiStepTCBQ,
  serviziTCB as serviziTCBQ
} from './modificaDomandaTCBGraphQL';
import DomandaTCB from 'components/navigation/ConfigurazioneRichiestaTCB';
import Loader from 'components/ui/Loader';
import withAuthentication from 'hoc/withAuthentication';
import checkAdmin from 'utils/functions/checkAdmin';
import {
  ID_SERVIZIO_TATA,
  ID_SERVIZIO_COLF,
  ID_SERVIZIO_BADANTE
} from 'types/tcbConstants';
import { isNullOrUndefined } from 'components/navigation/AccordionServAccr/accordionPartials/common/utils';
import { connect } from "react-redux";

const ModificaDomandaAdmin = ({ match, userProfile, locale }) => {

  const { datiLogin } = userProfile;

  const BreadcrumbPath = [
    {
      slash: 'Area Personale',
      url: 'areaPersonale',
    },
    {
      slash: 'Gestione domanda TCB',
      url: `admin/${userProfile.datiLogin.idCittadino}/richiesteTcb`,
    },
    {
      slash: 'Modifica domanda TCB',
      url: match.url,
    },
  ];
  const [datiStepTCB] = useGraphQLRequest(
    undefined,
    datiStepTCBQ,
    {
      idRichiestaTcb: parseInt(match.params.idDomandaTCB, 10)
    },
    true
  );
  const [serviziTCB] = useGraphQLRequest(
    undefined,
    serviziTCBQ,
    null,
    true
  );
  const [datiUtente] = useGraphQLRequest(
    undefined,
    EstraiUtenteDomandaTCBQ,
    { idDomandaTCB: parseInt(match.params.idDomandaTCB) },
    true,
    response => {
      return {
        datiLogin: {
          idCittadino: response.id_utente,
          nome: response.tx_nome_utente,
          cognome: response.tx_cognome_utente,
          sesso: response.cd_sesso_utente,
          anagraficaResidenza: response.js_anagrafica_residenza,
          codiceFiscale: response.ptx_codice_fiscale
        }
      }
    }
  );
  const datiStepTCB_obj = (!datiStepTCB.pristine && !datiStepTCB.isLoading && datiStepTCB.data) ? datiStepTCB.data : null;
  const servizioTCB = !serviziTCB.pristine && !serviziTCB.isLoading && serviziTCB.data && serviziTCB.data.filter(el => {
    let servizio;
    let servizio2;
    switch (parseInt(match.params.idServizioTCB)) {
      case ID_SERVIZIO_TATA:
        servizio = 'Baby-sitter';
        servizio2= "Tata";
        break;
      case ID_SERVIZIO_COLF:
        servizio = 'Colf';
        servizio2= "Colf";
        break;
      case ID_SERVIZIO_BADANTE:
        servizio = 'Badante';
        servizio2= "Badante";
        break;
      default:
      // code block
    }
    if (el.tl_valore_testuale[locale].toLowerCase() === servizio.toLowerCase() || el.tl_valore_testuale[locale].toLowerCase() === servizio2.toLowerCase())
      return el
  })[0];
  if (datiUtente.pristine && serviziTCB.pristine && datiStepTCB.pristine) {
    return null;
  }

  if (datiUtente.isLoading && serviziTCB.isLoading && datiStepTCB.isLoading) {
    return <Loader />
  }

  if (!checkAdmin(datiLogin)) {
    return <Redirect to={'areaPersonale'} />;
  }

  return (
    !isNullOrUndefined(datiUtente.data) && !isNullOrUndefined(serviziTCB.data) && !isNullOrUndefined(datiStepTCB.data) &&
    (
      <Wrapper>
        <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} />
        <DomandaTCB
          userProfile={datiUtente.data}
          idRichiestaTcb={parseInt(match.params.idDomandaTCB)}
          locale={locale}
          servizio={match.params.servizioTCB}
          datiStepTCB={datiStepTCB_obj}
          servizioTCB={servizioTCB}
          idAdmin={userProfile.datiLogin.idCittadino}
        />
      </Wrapper>
    )
  )
};

ModificaDomandaAdmin.displayName = 'ModificaDomandaAdmin';

const ModificaDomandaAdminWithAuthentication = withAuthentication(ModificaDomandaAdmin)

const mapStoreToProps = store => ({
  locale: store.locale,
})

export default withRouter(connect(mapStoreToProps)(ModificaDomandaAdminWithAuthentication));
