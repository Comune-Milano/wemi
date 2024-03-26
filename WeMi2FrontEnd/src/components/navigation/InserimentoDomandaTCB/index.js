/** @format */

import React, { useState } from 'react';
import { Row, Column } from 'components/ui/Grid';
import { Redirect } from 'react-router-dom';
import { ModaleSimulatoreCosto } from 'components/shared';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import Navlink from 'components/router/NavLink';
import { openLoginModal } from 'redux-modules/actions/authActions';
import { getIdServizio } from 'utils/functions/getIdServizio';
import { connect } from 'react-redux';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import {
  RecuperaUtente as RecuperaUtenteQ,
  tipoOrarioTCB as tipoOrarioTCBQ,
  modalitaAssunzioneTCB as modalitaAssunzioneTCBQ,
  inserisciRichiestaTCB as inserisciRichiestaTCBQ,
} from 'components/navigation/InserimentoDomandaTCB/partials/InserimentoLavoratore';
import Button from 'components/ui2/Button';
import { getNomeServizioTCB } from 'utils/functions';
import withAuthentication from 'hoc/withAuthentication';
import { CD_ORIGINE_RICHIESTA } from 'types/cdOrigineRichiesta';
import Wrapper from './partials/Wrapper';
import ModaleInfo from './partials/ModaleInfo';
import Risultati from './partials/Risultati';
import Anagrafica from './partials/Anagrafica';
import RecuperaUtente from './partials/RecuperaUtente';

const InserimentoDomanda = ({
  setFormField,
  resetFormFields,
  dataset,
  locale,
  loaded,
  errors,
  touched,
  userProfile,
  handleFieldBlur,
  isFormValid,
}) => {
  const isCfRicercaValorizzato = dataset.cfRicerca.trim().length > 0;

  const { datiLogin } = userProfile;


  const [Risultato, setrisultato] = useState();
  const [modalitaAssunzioneTCB, setAssunzione] = useState();
  const [livelliContrattuali, setContr] = useState();

  const fetchUtente = useStatelessGraphQLRequest(RecuperaUtenteQ);

  const recuperaUtente = async () => {
    const codicefiscale = dataset.cfRicerca;
    const result = await fetchUtente({ codicefiscale });
    setrisultato(result?.RecuperaUtente);
    if (result?.RecuperaUtente) {
      resetFormFields({
        cfRicerca: dataset.cfRicerca,
        nome: result.RecuperaUtente.nome,
        cognome: result.RecuperaUtente.cognome,
        codicefiscale: result.RecuperaUtente.ptx_codice_fiscale,
        servizioSelezionato: dataset.servizioSelezionato,
        orarioselezionato: dataset.orarioselezionato,
        email: result.RecuperaUtente.ptx_email,
      });
    } else {
      resetFormFields({
        cfRicerca: dataset.cfRicerca,
        nome: '',
        cognome: '',
        codicefiscale: '',
        servizioSelezionato: dataset.servizioSelezionato,
        orarioselezionato: dataset.orarioselezionato,
        email: '',
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


  const inserisciRichiestaTCB = useStatelessGraphQLRequest(
    inserisciRichiestaTCBQ,
  );
  const [redirect, setRedirect] = React.useState({
    flag: false,
    path: '',
  });

  const idServizio = getIdServizio(parseInt(dataset && dataset.servizioSelezionato && dataset.servizioSelezionato.id, 10));

  const callback = async (attributes) => {
    if (datiLogin === null) {
      openLoginModal(true);
    } else {
      const datiUtente = datiLogin;
      const idUtenteRichiedente = Risultato !== undefined ? Risultato.id_utente : datiUtente.idCittadino;
      const id_servizio_erogato_ente = dataset.servizioSelezionato.id;
      const result = await inserisciRichiestaTCB({
        idUtenteRichiedente,
        id_servizio_erogato_ente,
        arrayConfig: attributes,
        tyRichiesta: CD_ORIGINE_RICHIESTA.assunzioneDiretta,
        js_impersonificazione: {
          cdOperatore: datiUtente.idCittadino,
          cd_utente: Risultato !== undefined ? Risultato.id_utente : null,
          cognomeUtente: dataset.cognome,
          nomeUtente: dataset.nome,
          cfUtente: dataset.codicefiscale,
          emailUtente: dataset && dataset.email ? dataset.email : null,
          flUtenteCensito: Risultato !== undefined ? 'S' : 'N',
        },
      });
      const idRichiesta = result.InserisciRichiestaServizioTcb;
      const path =
        `/configurazionerichiestatcb/${getNomeServizioTCB(idServizio)}/${idRichiesta}`;
      setRedirect({
        flag: true,
        path,
      });
    }
  };

  const validitaConRisultato = !!Risultato &&
    !!modalitaAssunzioneTCB &&
    !!livelliContrattuali &&
    !!dataset.servizioSelezionato &&
    !!dataset.orarioselezionato;

  const validitaSenzaRisultato = !!modalitaAssunzioneTCB &&
    !!livelliContrattuali &&
    !!dataset.servizioSelezionato &&
    !!dataset.orarioselezionato;


  return (
    <Row fluid>
      {
        redirect.flag &&
        <Redirect to={redirect.path} />
      }
      <Wrapper>
        <RecuperaUtente
          dataset={dataset}
          isCfRicercaValorizzato={isCfRicercaValorizzato}
          setrisultato={setrisultato}
          setFormField={setFormField}
          setUtente={recuperaUtente}
          errors={errors}
          Risultato={Risultato}
          touched={touched}
          handleFieldBlur={handleFieldBlur}
        />
        <Anagrafica
          dataset={dataset}
          locale={locale}
          errors={errors}
          setFormField={setFormField}
          Risultato={Risultato}
          touched={touched}
          handleFieldBlur={handleFieldBlur}
          resetFormFields={resetFormFields}
          setAssunzione={setAssunzione}
          setContr={setContr}
        />

        {(validitaConRisultato ||
          validitaSenzaRisultato) && (
          <Risultati
            servizioTCB={dataset.servizioSelezionato}
            modalitaAssunzioneTCB={modalitaAssunzioneTCB}
            isCfRicercaValorizzato={isCfRicercaValorizzato}
            setOpenInfo={openModalInfo}
            dataset={dataset}
            setOpenSimulatore={setOpenSimulatore}
            livelliContrattuali={livelliContrattuali}
            locale={locale}
            errori={!isFormValid}
            Risultato={Risultato}
            loaded={loaded}
          />
        )}
        {modalitaAssunzioneTCB !== undefined &&
          dataset.servizioSelezionato !== undefined && (
          <ModaleInfo
            open={openInfo}
            setOpen={setOpenInfo}
            domain={modalInfoDomain}
            title={getObjectValue(modalitaAssunzioneTCB.find(el => el.cd_dominio_tcb === modalInfoDomain), `tl_valore_testuale.${locale}`, '')}
          />
        )}
        {dataset.servizioSelezionato !== undefined && (
          <ModaleSimulatoreCosto
            open={openSimulatore}
            setOpen={setOpenSimulatore}
            idServizio={idServizio}
            callback={callback}
            tipologiaOrario={dataset.orarioselezionato}
            livelloInquadramento={dataset.livelloInquadramento}
            userProfile={userProfile}
            servizioTCB={dataset.servizioSelezionato}
            locale={locale}
          />
        )}
        <Row fluid>
          <Column xs="4">
          </Column>
          <Column xs="4" margin="5em 0 0 0">
            <Navlink width="100%" to={`/admin/${datiLogin.idCittadino}/richiesteTcb`}>
              <Button label="Annulla" />
            </Navlink>
          </Column>
        </Row>
      </Wrapper>
    </Row>

  );
};
const mapStoreToProps = store => ({
  locale: store.locale,
  loaded: store.graphql.loaded,
});

InserimentoDomanda.displayName = 'InserimentoDomanda';

export default connect(mapStoreToProps)(withAuthentication(InserimentoDomanda));
