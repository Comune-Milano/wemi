/** @format */

import React, { useState, useEffect } from 'react';
import { Row } from 'components/ui/Grid';
import Wrapper from 'components/navigation/NavigationWrapper';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import { connect } from "react-redux";
import { userSelector } from "redux-modules/selectors/userSelectors";
import { Redirect } from "react-router-dom";
import AreaPersonale from './AreaPersonale';
import AreaPersonaleCittadino from './AreaPersonaleCittadino';
import { getAreaPersonaleCittadino, getAreaPersonaleEnte, getAreaPersonaleAmministratore, getAreaPersonaleLavoratore } from 'mocks/AreaPersonaleJson';
import withAuthentication from 'hoc/withAuthentication';
import { PAGE_HOME_URL } from 'types/url';
import checkCittadino from 'utils/functions/checkCittadino';
import checkAdmin from 'utils/functions/checkAdmin';
import checkEnte from 'utils/functions/checkEnte';
import checkLavoratore from 'utils/functions/checkLavoratore';
import ModaleRiepilogo from 'components/navigation/CandidaturaLavoratoreTCB/partials/ModaleRiepilogo';
import ModaleCV from 'components/shared/ModaleCV';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import {
  estraiStatoCandidatura as estraiStatoCandidaturaQ,
  countRichiesteLavoratore as countRichiesteLavoratoreQ,
  hasCitizenVoucher as hasVoucherQ,
} from './areaPersonaleGraphQL';

const BreadcrumbPath = [
  {
    slash: 'Home',
    url: ``
  },
  {
    slash: 'Area personale',
    url: `AreaPersonale`
  },
]


const AreaLoggata = ({ userProfile, locale }) => {
  const DatiLogin = userProfile.datiLogin;
  const [modaleRiepiogoCand, openModaleRiepilogoCand] = useState(false);
  const [modalCV, openModalCV] = useState(false);

  /** QUI MANTENGO I CONTROLLI PER LE TIPOLOGIE DI UTENZE */
  const validitaLavoratore = checkLavoratore(DatiLogin);
  const validitaCittadino = checkCittadino(DatiLogin);
  const validitaEnte = checkEnte(DatiLogin);
  const validitaAdmin = checkAdmin(DatiLogin);
  const validitaAreaPersonale = validitaCittadino ^ validitaEnte ^ validitaAdmin;

  const [statoCandidatura] = useGraphQLRequest(
    undefined,
    estraiStatoCandidaturaQ,
    { idUtenteLav: DatiLogin ? DatiLogin.idCittadino : null },
    validitaLavoratore
  );

  const [richiesteCountCheck] = useGraphQLRequest(
    undefined,
    countRichiesteLavoratoreQ,
    {},
    validitaLavoratore
  );

  const [hasVoucher] = useGraphQLRequest(
    undefined,
    hasVoucherQ,
    {},
    validitaLavoratore || validitaCittadino
  );

  const loaded = validitaLavoratore ?
    !statoCandidatura.pristine
    && !statoCandidatura.isLoading
    && !richiesteCountCheck.pristine
    && !richiesteCountCheck.isLoading
    : validitaCittadino;

  if ((loaded && statoCandidatura.errored) || !validitaAreaPersonale) {
    return (<Redirect to={PAGE_HOME_URL} />);
  }

  const areaPersonaleCittadino = loaded && getAreaPersonaleCittadino(statoCandidatura.data, openModaleRiepilogoCand, openModalCV, DatiLogin);
  const title = "PERSONALIZZA IL TUO CURRICULUM";
  const label = "Seleziona il colore che preferisci per realizzare il tuo curriculum.";
  const titleButton = "Scarica il tuo curriculum";

  const areaPersonaleEnte = getAreaPersonaleEnte(DatiLogin);
  const areaPersonaleAmministratore = getAreaPersonaleAmministratore(DatiLogin);

  return (
    <Wrapper>
      {(loaded && statoCandidatura.errored) || !validitaAreaPersonale ? <Redirect to={PAGE_HOME_URL} /> :
        <>
          <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} />
          <Row fluid padding="20px 0">
            {
              validitaEnte ?
                <AreaPersonale
                  {...areaPersonaleEnte}
                  paddingDescription="0 4em"
                />
                : null
            }
            {
              validitaCittadino && areaPersonaleCittadino ?
                <AreaPersonaleCittadino
                  validitaLavoratore={validitaLavoratore}
                  richiesteCount={validitaLavoratore ? richiesteCountCheck.data.count : undefined}
                  hasVoucher={hasVoucher}
                  {...areaPersonaleCittadino}
                />
                : null
            }
            {
              validitaAdmin ?
                <AreaPersonale
                  {...areaPersonaleAmministratore}
                  paddingDescription="0 2.5em"
                />
                : null
            }
          </Row>
          {validitaLavoratore ?
            <>
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
            : null}
        </>}
    </Wrapper>
  )
};

const mapStoreToProps = store => ({
  datiLogin: userSelector(store),
  locale: store.locale
});
const Area = withAuthentication(AreaLoggata);
export default connect(
  mapStoreToProps,
  null
)(Area);