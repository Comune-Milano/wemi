/** @format */

import React from 'react';
import { connect } from 'react-redux';
import { openLoginModal } from 'redux-modules/actions/authActions';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import Wrapper from 'components/navigation/NavigationWrapper';
import Loader from 'components/ui2/Loader';
import ConfigurazioneRichiestaTCB from 'components/navigation/ConfigurazioneRichiestaTCB';
import Stepper from 'components/ui2/Header/Stepper';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { Redirect } from 'react-router-dom';
import withAuthentication from 'hoc/withAuthentication';
import checkEnte from 'utils/functions/checkEnte';
import checkAdmin from 'utils/functions/checkAdmin';
import RedirectAdmin from 'components/router/RedirectAdmin';
import { RICHIESTA_TCB_BOZZA } from 'components/navigation/RequestsIndex/constants';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import { serviziTCB as serviziTCBQ, datiStepTCB as datiStepTCBQ } from './EstraiServizioTCBGraphql';

const ConfigurazioneRichiestaTCBPage = ({
  userProfile,
  locale,
  match,
}) => {
  const [serviziTCB] = useGraphQLRequest(
    undefined,
    serviziTCBQ,
    null,
    true
  );

  const [datiStepTCB] = useGraphQLRequest(
    undefined,
    datiStepTCBQ,
    {
      idRichiestaTcb: parseInt(match.params.idRichiesta, 10),
    },
    true
  );

  const servizioTCB = !serviziTCB.pristine && !serviziTCB.isLoading && serviziTCB.data && serviziTCB.data.filter(el => {
    if (el.tl_valore_testuale[locale].toLowerCase() === match.params.tcb.toLowerCase() ||
      (match.params.tcb.toLowerCase() === 'baby-sitter' && el.tl_valore_testuale[locale].toLowerCase() === 'tata')
    ) return el;
  })[0];

  const { datiLogin } = userProfile;
  const validitaAdmin = checkAdmin(datiLogin);
  const validitaEnte = checkEnte(datiLogin);

  const datiStepTCB_obj = (!datiStepTCB.pristine && !datiStepTCB.isLoading && datiStepTCB.data) ? datiStepTCB.data : null;


  const datiStepTCB_Error = datiStepTCB.errored;


  const loaded = servizioTCB && !serviziTCB.pristine && !serviziTCB.isLoading &&
    datiStepTCB_obj && !datiStepTCB.pristine && !datiStepTCB.isLoading;


  const BreadcrumbPathAdmin = [
    {
      slash: 'Area personale',
      url: 'areaPersonale',
    },
    {
      slash: 'Gestione richieste servizio TCB',
      url: `/admin/${getObjectValue(datiLogin, 'idCittadino', ':idCittadino')}/richiesteTcb`,
    },
    {
      slash: servizioTCB && `Richiesta Servizio ${servizioTCB.tl_valore_testuale[locale]}`,
      url: null,
    },
  ];

  const BreadcrumbPathCitt = [
    {
      slash: 'Home',
      url: '',
    },
    {
      slash: 'Tate, Colf e Badanti',
      url: 'menutcb',
    },
    {
      slash: 'Trova un assistente familiare',
      url: 'menutcb/cittadino',
    },
    {
      slash: servizioTCB && `Richiesta Servizio ${servizioTCB.tl_valore_testuale[locale]}`,
      url: null,
    },
  ];

  const steps = [
    {
      title: 'Scegli la tipologia di servizio',
      color: 'green',
      link: null,
      active: false,
    },
    {
      title: 'Completa la richiesta',
      color: 'primary',
      link: null,
      active: true,
    },
  ];
  return (
    <Wrapper>

      {
        (
          // validitaAdmin || Commentato per impersonficazione
          validitaEnte || datiStepTCB_Error) ?
            <RedirectAdmin /> :
          (
            <>
              <Breadcrumbs value="Breadcrumb.page" pathSlashes={validitaAdmin ? BreadcrumbPathAdmin : BreadcrumbPathCitt} />
              <Stepper steps={steps} />

              {!(datiLogin && datiLogin.idCittadino) ?
                <Redirect to="/menutcb" />
                : null
              }
              {loaded ?
                 datiStepTCB_obj.statoRichiesta === parseInt(RICHIESTA_TCB_BOZZA, 10) ? (
                   <ConfigurazioneRichiestaTCB
                     servizioTCB={servizioTCB}
                     datiStepTCB={datiStepTCB_obj}
                     servizio={match.params.tcb}
                     locale={locale}
                     userProfile={userProfile}
                     idRichiestaTcb={parseInt(match.params.idRichiesta, 10)}
                   />
                 )
                  :
                   <RedirectAdmin />
                : <Loader margin="6em auto" />
              }
            </>
          )

      }
    </Wrapper>

  );
};

ConfigurazioneRichiestaTCBPage.displayName = 'ConfigurazioneRichiestaTCBPage';


const mapStoreToProps = store => ({
  locale: store.locale,
});
const mapDispatchToProps = {
  openLoginModal,
};
const ConfigurazioneRichiestaTCBPageWithAuth = withAuthentication(ConfigurazioneRichiestaTCBPage);
export default connect(
  mapStoreToProps,
  mapDispatchToProps,
)(ConfigurazioneRichiestaTCBPageWithAuth);
