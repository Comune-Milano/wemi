/** @format */

import React, { useState } from 'react';
import { Row } from 'components/ui/Grid';
import Wrapper from 'components/navigation/NavigationWrapper';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import { connect } from 'react-redux';
import { userSelector } from 'redux-modules/selectors/userSelectors';
import { Redirect } from 'react-router-dom';
import { getAreaPersonaleLavoratore } from 'mocks/AreaPersonaleJson';
import withAuthentication from 'hoc/withAuthentication';
import { PAGE_HOME_URL } from 'types/url';
import checkLavoratore from 'utils/functions/checkLavoratore';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import ModaleRiepilogo from 'components/navigation/CandidaturaLavoratoreTCB/partials/ModaleRiepilogo';
import ModaleCV from 'components/shared/ModaleCV';
import { estraiStatoCandidatura as estraiStatoCandidaturaQ } from './areaPersonaleGraphQL';
import AreaPersonale from './AreaPersonale';

const BreadcrumbPath = [
  {
    slash: 'Home',
    url: '',
  },
  {
    slash: 'Area personale',
    url: 'AreaPersonale',
  },
];


const AreaLoggata = ({ userProfile, locale }) => {
  const DatiLogin = userProfile.datiLogin;

  const [modaleRiepiogoCand, openModaleRiepilogoCand] = useState(false);
  const [modalCV, openModalCV] = useState(false);

  const validitaLavoratore = checkLavoratore(DatiLogin);
  const validitaAreaPersonale = validitaLavoratore;

  const [statoCandidatura] = useGraphQLRequest(
    undefined,
    estraiStatoCandidaturaQ,
    { idUtenteLav: DatiLogin ? DatiLogin.idCittadino : null },
    !!DatiLogin
  );

  const loaded = !statoCandidatura.pristine && !statoCandidatura.isLoading;

  if ((loaded && statoCandidatura.errored) || !validitaAreaPersonale) {
    return (<Redirect to={PAGE_HOME_URL} />);
  }

  const areaPersonaleLavoratore = loaded && getAreaPersonaleLavoratore(statoCandidatura.data, openModaleRiepilogoCand, openModalCV, DatiLogin);
  const title = 'SCARICA IL TUO CV';
  const label = 'Seleziona uno dei colori WeMi per la stampa del tuo CV';
  const titleButton = 'Scarica CV';

  return (
    <Wrapper>
      <>
        <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} />
        <Row fluid padding="20px">
          {
            validitaLavoratore && areaPersonaleLavoratore ?
              <AreaPersonale
                {...areaPersonaleLavoratore}
              />
              : null
          }
        </Row>
        <ModaleRiepilogo
          locale={locale}
          open={modaleRiepiogoCand}
          setOpen={openModaleRiepilogoCand}
          idLavoratore={DatiLogin.idCittadino}
        />
        <ModaleCV
          locale={locale}
          open={modalCV}
          setOpen={openModalCV}
          idUtente={DatiLogin.idCittadino}
          title={title}
          label={label}
          titleButton={titleButton}
        />
      </>
    </Wrapper>
  );
};
AreaLoggata.displayName = 'AreaLoggata';

const mapStoreToProps = store => ({
  datiLogin: userSelector(store),
  locale: store.locale,
});
const Area = withAuthentication(AreaLoggata);
export default connect(
  mapStoreToProps,
  null
)(Area);