/** @format */

import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Row } from 'components/ui/Grid';
import { Redirect } from 'react-router-dom';
import { openLoginModal } from 'redux-modules/actions/authActions';
import { ModaleSimulatoreCosto } from 'components/shared';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import withAuthentication from 'hoc/withAuthentication';
import { getNomeServizioTCB } from 'utils/functions';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { CD_ORIGINE_RICHIESTA } from 'types/cdOrigineRichiesta';
import { RequestForm, Risultati, ModaleInfo } from './partials';
import { inserisciRichiestaTCB as InserisciRichiestaTCBM,
  EstraiMaxOre as EstraiMaxOreQ } from './InserisciRichiestaTcbGraphql';

const Wrapper = styled(Row)`
position: relative;
`;

const RichiestaServizioTCB = ({
  idServizio,
  servizioTCB,
  selectedValue,
  handleOrario,
  handleLivello,
  livelliContrattuali,
  orariTCB,
  modalitaAssunzioneTCB,
  loaded,
  locale,
  openLoginModal,
  userProfile,
}) => {
  const [maxOre] = useGraphQLRequest(
    undefined,
    EstraiMaxOreQ,
    {},
    true
  );

  const inserisciRichiestaTCB = useStatelessGraphQLRequest(
    InserisciRichiestaTCBM,
  );
  const [redirect, setRedirect] = React.useState({
    flag: false,
    path: '',
  });

  const { datiLogin } = userProfile;

  const callback = async (attributes) => {
    if (datiLogin === null) {
      setOpenSimulatore(false);
      const livelloContrattuale = {
        id: attributes[0].cd_val_attributo,
      };
      const orario = {
        id: attributes[1].cd_val_attributo,
      };
      handleOrario(orario, livelloContrattuale);
      openLoginModal(true);
    } else {
      // const datiUtente = JSON.parse(sessionStorage.getItem('DatiLogin'));
      const datiUtente = datiLogin;
      const idUtenteRichiedente = datiUtente.idCittadino;
      const id_servizio_erogato_ente = servizioTCB.cd_dominio_tcb;
      const result = await inserisciRichiestaTCB({
        idUtenteRichiedente,
        id_servizio_erogato_ente,
        arrayConfig: attributes,
        tyRichiesta: CD_ORIGINE_RICHIESTA.assunzioneDiretta,
      });
      const idRichiesta = result.InserisciRichiestaServizioTcb;
      const path = `/configurazionerichiestatcb/${getNomeServizioTCB(idServizio)}/${idRichiesta}`;
      setRedirect({
        flag: true,
        path,
      });
    }
  };

  const [openInfo, setOpenInfo] = useState(false);
  const [modalInfoDomain, setModalInfoDomain] = useState(0);
  const [openSimulatore, setOpenSimulatore] = useState(false);

  const openModalInfo = (domain) => {
    setModalInfoDomain(domain);
    setOpenInfo(!openInfo);
  };

  const { isLoading, pristine, errored } = maxOre;
  const hasEndedLoading = !isLoading && !pristine && !errored;

  if (!hasEndedLoading) {
    return null;
  }

  return (
    <>
      {
        redirect.flag ?
          <Redirect to={redirect.path} />
          : null
      }
      <Wrapper fluid justifycontent="space-between">
        <RequestForm
          servizioTCB={servizioTCB}
          selectedValue={selectedValue}
          handleLivello={handleLivello}
          idServizioTCB={idServizio}
          handleOrario={handleOrario}
          orariTCB={orariTCB}
          locale={locale}
          loaded={loaded}
          allLivelliContrattuali={livelliContrattuali}
          maxOre={maxOre.data?.EstraiMaxOre}
        />
        <Risultati
          selectedValue={selectedValue}
          servizioTCB={servizioTCB}
          modalitaAssunzioneTCB={modalitaAssunzioneTCB}
          setOpenInfo={openModalInfo}
          setOpenSimulatore={setOpenSimulatore}
          livelliContrattuali={livelliContrattuali}
          locale={locale}
          loaded={loaded}
        />
      </Wrapper>
      <ModaleInfo
        open={openInfo}
        setOpen={setOpenInfo}
        domain={modalInfoDomain}
        title={getObjectValue(modalitaAssunzioneTCB.find(el => el.cd_dominio_tcb === modalInfoDomain), `tl_valore_testuale.${locale}`, '')}
      />
      <ModaleSimulatoreCosto
        open={openSimulatore}
        setOpen={setOpenSimulatore}
        idServizio={idServizio}
        callback={callback}
        tipologiaOrario={selectedValue.orario}
        livelloInquadramento={selectedValue.livello}
        userProfile={userProfile}
        servizioTCB={servizioTCB}
        locale={locale}
      />
    </>
  );
};

const mapDispatchToProps = {
  openLoginModal,
};

RichiestaServizioTCB.displayName = 'RichiestaServizioTCB';
export default connect(null, mapDispatchToProps)(withAuthentication(RichiestaServizioTCB));
