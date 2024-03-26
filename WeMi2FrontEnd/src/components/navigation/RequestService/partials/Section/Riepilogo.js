/** @format */
import React, { useState } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Row, Column } from 'components/ui/Grid';
import { openLoginModal } from 'redux-modules/actions/authActions';
import { mutationAddService as mutationAddServiceM } from 'components/navigation/RequestService/RequestServiceGraphQL';
import Button from 'components/ui2/Button';
import withAuthentication from 'hoc/withAuthentication';
import checkCittadino from 'utils/functions/checkCittadino';
import { removeSelectedEnte } from 'redux-modules/actions/forwardEntiActions';
import CardEnte from 'components/pages/ENTIRI/ENTIRI001_RicercaServizio/GrigliaEnti/CardEnte';
import Text from 'components/ui/Text';
import styled from 'styled-components';
import { colors } from 'theme';
import { hexToRgba } from 'utils/functions/hexToRgba';
import ModalePrezziServizio from 'components/shared/ModalePrezziServizio';
import ModaleRecensioni from 'components/shared/ModaleRating';
import ModaleSchedaEnte from 'components/shared/ModaleSchedaEnte';
import ModaleServizioEnte from 'components/shared/ModaleServizioEnte';
import { idServiziTCB } from 'types/tcbConstants';
import { withRouter } from 'react-router';
import { CD_ORIGINE_RICHIESTA } from 'types/cdOrigineRichiesta';
import { PAGE_REQUESTSINDEX_URL } from 'types/url';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import Loader from 'components/ui2/Loader';
import { DataProcessingModal } from '../DataProcessingModal';

const StyledRow = styled.div`
  margin: 2em 0 0 0;
  background-color: ${hexToRgba(colors.primary, 0.15)};
`;

const Riepilogo = ({
  entiSelezionati,
  dataset,
  isFormValid,
  DatiLogin,
  userProfile,
  openLoginModal,
  removeEnte,
  filtri,
  labelFasceOrarie,
  labelMansioni,
  labelDestinatari,
  indirizzo,
  match,
  history,
}) => {
  const { fromDay, toDay, messaggioAgliEnti, infoDisp } = dataset;
  const { datiLogin } = userProfile;
  const idServizio = Number.parseInt(match.params?.idServizio, 10);
  const isTCBService = idServiziTCB.includes(idServizio);

  const [addServiceRequest, addService] = useGraphQLRequest(
    undefined,
    mutationAddServiceM
  );

  const [modalePrezziData, setModalePrezziData] = useState({
    open: false,
    idServizioRiferimento: null,
    idEnte: null,
  });
  const [modaleRecensioniData, setModaleRecensioniData] = useState({
    open: false,
    idServizioRiferimento: null,
    idEnte: null,
  });

  const [modaleServizioEnteData, setModaleServizioEnteData] = useState({
    open: false,
    idServizioRiferimento: null,
    idEnte: null,
  });

  const [modaleSchedaEnteData, setModaleSchedaEnteData] = useState({
    open: false,
    idEnte: null,
  });

  const [isDataProcessingModalVisible, setIsDataProcessingModalVisible] = useState(false);

  const closeModaleSchedaEnte = () => {
    setModaleSchedaEnteData(old => ({
      ...old,
      open: false,
    }));
  };

  const openModaleSchedaEnte = (idEnte) => (
    () => {
      setModaleSchedaEnteData({
        idEnte,
        open: true,
      });
    }
  );

  const closeModalePrezzi = () => {
    setModalePrezziData(old => ({
      ...old,
      open: false,
    }));
  };

  const openModalePrezzi = (idServizioRiferimento, idEnte) => (
    () => {
      setModalePrezziData({
        idServizioRiferimento,
        idEnte,
        open: true,
      });
    }
  );

  const closeModaleRecensioni = () => {
    setModaleRecensioniData(old => ({
      ...old,
      open: false,
    }));
  };

  const openModaleRecensioni = (idServizioRiferimento, idEnte) => (
    () => {
      setModaleRecensioniData({
        idServizioRiferimento,
        idEnte,
        open: true,
      });
    }
  );

  const closeModaleServizioEnte = () => {
    setModaleServizioEnteData(old => ({
      ...old,
      open: false,
    }));
  };

  const openModaleServizioEnte = (idServizioRiferimento, idEnte) => (
    () => {
      setModaleServizioEnteData({
        idServizioRiferimento,
        idEnte,
        open: true,
      });
    }
  );

  const validitaCittadino = React.useMemo(() => checkCittadino(datiLogin), [userProfile]);

  const validitaForm = !isFormValid || (datiLogin && !validitaCittadino);
  const {
    quantitaPersone,
    quantitaUnita,
  } = filtri;

  const confirmServiceRequestSending = async () => {
    const entiJSON = entiSelezionati.map(ente => ({
      id_servizio_erogato_ente: ente.idServizioEnte,
      ts_scadenza_acquisto: new Date(),
      im_costo_totale_calcolato: ente.prezzoMinimoDaMostrare,
      im_costo_totale_ente: null,
      id_preventivo_ente: 1,
    }));

    const jsDatiRichiesta = {
      fgRichiestaDisponibilita: infoDisp === 1,
      qtBaseRichiesta: quantitaUnita,
      qtPersone: quantitaPersone,
      destinatari: labelDestinatari,
      mansioni: labelMansioni,
      indirizzo,
      momentiGiornata: labelFasceOrarie,
      txNotaRichiesta: messaggioAgliEnti,
    };

    const dtPeriodoDal = fromDay !== '' && infoDisp === 1 ? moment(fromDay).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD');
    const dtPeriodoAl = toDay !== '' && infoDisp === 1 ? moment(toDay).format('YYYY-MM-DD') : moment().add(30, 'days').format('YYYY-MM-DD');

    await addService({
      input: {
        dt_periodo_proposto_dal: dtPeriodoDal,
        dt_inizio_val: dtPeriodoDal,
        dt_periodo_proposto_al: dtPeriodoAl,
        dt_fine_val: dtPeriodoAl,
        enti: entiJSON,
        js_dati_richiesta: jsDatiRichiesta,
        ty_richiesta: isTCBService ? CD_ORIGINE_RICHIESTA.spaziWeMi : CD_ORIGINE_RICHIESTA.acquistoServizioEnte,
      },
    });

    history.push(PAGE_REQUESTSINDEX_URL);
  };

  const sendServiceRequest = async () => {
    if (!datiLogin && !DatiLogin.modal) {
      openLoginModal(!DatiLogin.modal);
      return;
    }

    setIsDataProcessingModalVisible(true);
  };

  const sendRequestDisabled = validitaForm || addServiceRequest.isLoading || !entiSelezionati.length;

  return (
    <>
      { addServiceRequest.isLoading ? <Loader overlay /> : null }
      <Row fluid>
        <Button
          label="Invia richiesta"
          disabled={sendRequestDisabled}
          fontSize="f6"
          color="blue"
          onClick={sendServiceRequest}
        />
      </Row>
      <StyledRow fluid>
        {
          entiSelezionati && entiSelezionati.length > 0 ?
            (
              <>
                <Row>
                  <Text
                    value="Riepilogo enti selezionati"
                    tag="h2"
                    transform="uppercase"
                    letterSpacing="0.05em"
                    intlFormatter
                    color="black"
                    weight="normal"
                    size="f6"
                    padding="0.8em 1.2em 0.8em 1.2em"
                  />
                </Row>
                {
                  entiSelezionati.map((ente) => (
                    <Row margin="0 0 2em 0" key={ente.idServizioEnte} fluid>
                      <Column xs="12" padding="0">
                        <CardEnte
                          isSelected
                          ente={ente}
                          reviewMode
                          toggleEnte={() => { }}
                          removeEnte={() => { removeEnte(ente.idServizioEnte); }}
                          backgroundColor="transparent"
                          openModalePrezzi={openModalePrezzi(ente.idServizioEnte, ente.idEnte)}
                          openModaleRecensioni={openModaleRecensioni(ente.idServizioEnte, ente.idEnte)}
                          openModaleSchedaEnte={openModaleSchedaEnte(ente.idEnte)}
                          openModaleServizioEnte={openModaleServizioEnte(ente.idServizioEnte, ente.idEnte)}
                          quantita={{ quantitaPersone, quantitaUnita }}
                        />
                      </Column>
                    </Row>
                  ))
                }
              </>
            )
            : null
        }
      </StyledRow>
      <ModalePrezziServizio
        idEnte={modalePrezziData.idEnte}
        idServizioRiferimento={modalePrezziData.idServizioRiferimento}
        open={modalePrezziData.open}
        setOpen={closeModalePrezzi}
      />
      <ModaleRecensioni
        idEnte={modaleRecensioniData.idEnte}
        idServizioRiferimento={modaleRecensioniData.idServizioRiferimento}
        open={modaleRecensioniData.open}
        setOpen={closeModaleRecensioni}
      />
      <ModaleServizioEnte
        idEnte={modaleServizioEnteData.idEnte}
        idServizioEnte={modaleServizioEnteData.idServizioRiferimento}
        open={modaleServizioEnteData.open}
        setOpen={closeModaleServizioEnte}
      />
      <ModaleSchedaEnte
        idEnte={modaleSchedaEnteData.idEnte}
        open={modaleSchedaEnteData.open}
        setOpen={closeModaleSchedaEnte}
      />
      <DataProcessingModal
        isOpen={isDataProcessingModalVisible}
        onVisibilityChange={setIsDataProcessingModalVisible}
        onClickNext={confirmServiceRequestSending}
      />
    </>
  );
};

Riepilogo.displayName = 'Riepilogo';

const mapStoreToProps = store => ({
  enti: store.user.enti,
  DatiLogin: store.datiLogin,
});

const mapDispatchToProps = {
  openLoginModal,
  removeSelectedEnte,
};

export default connect(mapStoreToProps, mapDispatchToProps)(
  withAuthentication(withRouter(Riepilogo))
);
