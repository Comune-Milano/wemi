/** @format */

import React, { useState, useEffect } from 'react';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Table from 'components/ui/Table';
import Button from 'components/ui2/Button';
import Pagination from 'components/ui2/Pagination';
import { colors } from 'theme';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import Input from 'components/ui2/Input';
import DatePicker from 'components/ui2/DatePicker';
import Select from 'components/ui2/Select';
import ButtonIcon from 'components/ui2/FaIcon/ButtonIcon';
import Drawer from 'components/ui2/Drawer';
import Header from 'components/ui2/Header';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import ModaleRiepilogoRichiesta from 'components/shared/ModaleRiepilogoRichiesta/ModaleRiepilogoRichiesta';
import { getNomeServizioTCB } from 'utils/functions';
import {
  ID_SERVIZIO_TATA,
  ID_SERVIZIO_COLF,
  ID_SERVIZIO_BADANTE,
} from 'types/tcbConstants';
import Tooltip from 'components/ui2/Tooltip';
import styled from 'styled-components';
import {
  EstraiRichiesteTcb as EstraiRichiesteTcbQ,
  DominioTcbByTipoTcb as DominioTcbByTipoTcbQ,
  AttivitaInPending as AttivitaInPendingQ,
} from './backofficeTcbRichiesteGraphQL';
import {
  DrawerHeaderRichiesteTcb,
  DrawerBodyRichiesteTcb,
} from './partials/DrawerRichiesteTcb/partials';
import { statiDomandaTCB } from 'types/statiDomandaTCB';

const AttivitaPendingHover = styled(Text)`
 ${props => props.data && props.data.length ?
    `
  :hover {
    color: #005CB9
    cursor: pointer
  }
 `
    : ''}
`;
AttivitaPendingHover.displayName = 'AttivitaPendingHover';

const AttivitaPendingText = ({ data, titolo, onClickText, }) => (
  <AttivitaPendingHover
    data={data}
    value={`${(data && data.length) || 0} ${titolo} `}
    tag="p"
    weight={data && data.length ? 'bold' : 'normal'}
    whitespace="break-spaces"
    onClick={data && data.length ? onClickText : null}
  />
);
AttivitaPendingText.displayName = 'AttivitaPendingText';

const BackofficeTcbListaRichieste = ({ locale, richiesteTcbButtonsTypes, history }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [numeroElementi, setNumeroElementi] = useState(0);
  const [itemPerPage] = useState(10);
  const filterAllStatoRichiesta = { id: null, value: 'Tutti gli stati' };
  const filterAllidServizio = { id: null, value: 'Tutte le tipologie' };
  const [filterData, setFilterData] = useState({
    richiedente: undefined,
    dataRichiestaDal: undefined,
    dataRichiestaAl: undefined,
    statoRichiesta: filterAllStatoRichiesta,
    idServizio: filterAllidServizio,
    idDomandaBase: undefined,
    lavoratoreAssociato: undefined,
  });
  const [{ openDrawer, rowDataDrawer }, setOpenDrawer] = useState({ openDrawer: false, rowDataDrawer: null });
  const [{ openModalRiepilogo, idRichiestaTcb, idServizio }, setOpenModalRiepilogo] = useState({
    openModalRiepilogo: false,
    idRichiestaTcb: null,
    idServizio: null,
  });

  const dominioTcbTipoServizio = [
    filterAllidServizio,
    { id: ID_SERVIZIO_TATA, value: 'Baby-Sitter' },
    { id: ID_SERVIZIO_COLF, value: 'Colf' },
    { id: ID_SERVIZIO_BADANTE, value: 'Badante' },
  ];

  const Colonne = [
    'Codice richiesta',
    'Tipologia servizio',
    'Data richiesta',
    'Nome famiglia',
    'Stato richiesta famiglia',
    'Lavoratori associati',
    'Ultimo Operatore',
    'Ultimo Aggiornamento',
    'Azioni',
  ];

  const SetLavoratoriAssociati = (lavoratori) => {
    const lavoratoreAssociato = lavoratori && lavoratori.find(el => el.statoAssociazione === 1);
    const lavoratoriDispOttenutaDaRichiedere = (lavoratori && lavoratori.filter(el => el.statoAssociazione === 5 || el.statoAssociazione === 6)) || [];

    return (
      <>
        {lavoratoreAssociato ? (
          <Tooltip
            fluid
            position="bottom"
            color="white"
            bgcolor="primary"
            preventOnHover={lavoratoriDispOttenutaDaRichiedere.length === 0}
            value={lavoratoriDispOttenutaDaRichiedere.map(el => el.value).join(', ')}
          >
            <Text
              intlFormatter
              tag="span"
              value={lavoratoreAssociato.value}
              color="green"
              size="f8"
            />
          </Tooltip>
        ) : null}
        {!lavoratoreAssociato && lavoratoriDispOttenutaDaRichiedere.length > 0 ? (
          <Tooltip
            fluid
            position="bottom"
            color="white"
            bgcolor="primary"
            preventOnHover={lavoratoriDispOttenutaDaRichiedere.length === 0}
            value={lavoratoriDispOttenutaDaRichiedere.map(el => el.value).join(', ')}
          >
            <Text
              intlFormatter
              tag="span"
              value={lavoratoriDispOttenutaDaRichiedere.length}
              size="f8"
            />
          </Tooltip>
        ) : null}
      </>
    );
  };
  SetLavoratoriAssociati.displayName = 'SetLavoratoriAssociati';

  const [richiesteTcbData, performRequestRichiesteTcb] = useGraphQLRequest(
    [],
    EstraiRichiesteTcbQ,
    {
      numeroElementi,
      locale: `{${locale}}`,
    },
    true,
    data => ({
      results: data.results.map(row => ({
        codiceRichiesta: (
          <Text
            intlFormatter
            tag="h1"
            value={row.codiceRichiestaBase}
            style={{
              cursor: 'pointer',
              fontSize: '.9rem',
              fontWeight: 'normal',
              color: '#005CB9',
            }}
            onClick={() => handleClickCodiceRichiesta(row)}
          />
        ),
        tipologiaServizio: getNomeServizioTCB(parseInt(row.idServizio, 10)),
        dataRichiesta: moment(row.dataRichiesta).format('DD-MM-YYYY') || null,
        nomeFamiglia: row.jsImpersonificazione !== null ? `${row.nomeFamiglia} *` : row.nomeFamiglia,
        statoRichiestaFamiglia: row.statoRichiestaFamiglia,
        lavoratoriAssociati: SetLavoratoriAssociati(row.lavoratoriAssociati),
        ultimoOperatore: row.ultimoOperatore,
        ultimoAggiornamento: row.ultimoAggiornamento ? moment(row.ultimoAggiornamento).format('DD-MM-YYYY HH:mm') : null,
        azioni: (
          <ButtonIcon
            icon="angle-right"
            fontSize="f6"
            color="blue"
            onClick={() => handleClickAzioni({
              ...row,
              tipologiaServizioName: getNomeServizioTCB(parseInt(row.idServizio, 10)),
            })}
          />
        ),
      })),
      righeTotali: data.righeTotali,
    })
  );

  const [dominioTcbStatoRichiesta] = useGraphQLRequest(
    [],
    DominioTcbByTipoTcbQ,
    {
      ty_dominio_tcb: 50,
    },
    true,
    data => {
      const dataMap = data.filter(el => el.value !== statiDomandaTCB.storicoEsperienzaLavoratore && el.value !== statiDomandaTCB.bozza).map(row => ({ id: row.value, value: row.textValue }));
      dataMap.unshift(filterAllStatoRichiesta);
      return dataMap;
    }
  );

  const [attivitaInPending] = useGraphQLRequest(
    [],
    AttivitaInPendingQ,
    {},
    true,
  );

  const [attivitaPendingClicked, setAttivitaPendingClicked] = useState({
    feedbackDaRichiedere: false,
    feedbackDaConfermare: false,
    richiesteDaAnnullare: false,
    richiesteInGestione: false,
    richiestedaChiuderePositivamente: false,
    txValueAttivo: null,
  });

  useEffect(() => {
    updateTableData(0);
    setCurrentPage(1);
  }, [attivitaPendingClicked]);

  const getElementi = numero => {
    const elementi = (numero - 1) * itemPerPage;
    setNumeroElementi(elementi);
    updateTableData(elementi);
  };

  const clickInserisciDomanda = () => {
    history.push('/r/InserimentoDomandaCittadino');
  };

  const clickCerca = () => {
    setAttivitaPendingClicked({
      feedbackDaRichiedere: false,
      feedbackDaConfermare: false,
      richiesteDaAnnullare: false,
      richiesteInGestione: false,
      richiestedaChiuderePositivamente: false,
      txValueAttivo: null
    });
  };

  const handleChangeRichiedente = value => {
    setFilterData({
      ...filterData,
      richiedente: value || undefined,
    });
  };

  const handleChangeDataRichiestaDal = value => {
    setFilterData({
      ...filterData,
      dataRichiestaDal: value || undefined,
    });
  };

  const handleChangeDataRichiestaAl = value => {
    setFilterData({
      ...filterData,
      dataRichiestaAl: value || undefined,
    });
  };

  const handleChangeidServizio = event => {
    setFilterData({
      ...filterData,
      idServizio: event || undefined,
    });
  };

  const handleChangeStatoRichiesta = event => {
    setFilterData({
      ...filterData,
      statoRichiesta: event || undefined,
    });
  };

  const handleChangeIdDomandaBase = value => {
    setFilterData({
      ...filterData,
      idDomandaBase: value || undefined,
    });
  };

  const handleChangeLavoratoreAssociato = value => {
    setFilterData({
      ...filterData,
      lavoratoreAssociato: value || undefined,
    });
  };

  const handleClickAzioni = rowData => {
    setOpenDrawer({ openDrawer: true, rowDataDrawer: rowData });
  };

  const handleClickCodiceRichiesta = rowData => {
    setOpenModalRiepilogo({
      openModalRiepilogo: true,
      idRichiestaTcb: rowData.codiceRichiesta,
      idServizio: rowData.idServizio,
    });
  };

  const updateTableData = (elementi) => {
    setOpenDrawer({ openDrawer: false });
    const data = {
      richiedente: filterData.richiedente ? filterData.richiedente : undefined,
      dataRichiestaDal: filterData.dataRichiestaDal ? moment(filterData.dataRichiestaDal).format('YYYY-MM-DD') : undefined,
      dataRichiestaAl: filterData.dataRichiestaAl ? moment(filterData.dataRichiestaAl).format('YYYY-MM-DD') : undefined,
      statoRichiesta: filterData.statoRichiesta.id !== null ? filterData.statoRichiesta.value : undefined,
      idServizio: filterData.idServizio.id !== null ? filterData.idServizio.id : undefined,
      idDomandaBase: filterData.idDomandaBase ? filterData.idDomandaBase : undefined,
      lavoratoreAssociato: filterData.lavoratoreAssociato ? filterData.lavoratoreAssociato : undefined,
      idRichiesteAttivitaPending: getIdRichiesteAttivitaPending(),
    };

    performRequestRichiesteTcb({
      numeroElementi: elementi !== undefined ? elementi : numeroElementi,
      locale: `{${locale}}`,
      searchFilter: Object.values(data).every(el => el === undefined) ? undefined : { ...data },
    });
  };

  const getIdRichiesteAttivitaPending = () => {
    if (attivitaPendingClicked.feedbackDaRichiedere && attivitaInPending.data.feedbackDaRichiedere) {
      return attivitaInPending.data.feedbackDaRichiedere.map(el => el.idRichiesta);
    } if (attivitaPendingClicked.feedbackDaConfermare && attivitaInPending.data.feedbackDaConfermare) {
      return attivitaInPending.data.feedbackDaConfermare.map(el => el.idRichiesta);
    } if (attivitaPendingClicked.richiesteDaAnnullare && attivitaInPending.data.richiesteDaAnnullare) {
      return attivitaInPending.data.richiesteDaAnnullare.map(el => el.idRichiesta);
    } if (attivitaPendingClicked.richiesteInGestione && attivitaInPending.data.richiesteInGestione) {
      return attivitaInPending.data.richiesteInGestione.map(el => el.idRichiesta);
    } if (attivitaPendingClicked.richiestedaChiuderePositivamente && attivitaInPending.data.richiestedaChiuderePositivamente) {
      return attivitaInPending.data.richiestedaChiuderePositivamente.map(el => el.idRichiesta);
    }

    return undefined;
  };

  return (
    <>
      <Header
        title="Gestione Richieste Servizi Tate, Colf e Badanti"
        fontSize="f4"
        color="blue"
      />
      <Row fluid margin="0 0 0 1em">
        <Text
          color="green"
          transform="uppercase"
          letterSpacing="0.05em"
          value="Attività in pending: "
          tag="p"
          weight="bold"
          whitespace="break-spaces"
        />
        <AttivitaPendingText
          data={attivitaInPending.data.feedbackDaRichiedere}
          titolo="feedback da richiedere, "
          onClickText={() => {
            setAttivitaPendingClicked({
              feedbackDaRichiedere: true,
              txValueAttivo: "feedback da richiedere"
            });
          }}
        />
        <AttivitaPendingText
          data={attivitaInPending.data.feedbackDaConfermare}
          titolo="feedback da confermare, "
          onClickText={() => {
            setAttivitaPendingClicked({
              feedbackDaConfermare: true,
              txValueAttivo: "feedback da confermare"
            });
          }}
        />
        <AttivitaPendingText
          data={attivitaInPending.data.richiesteDaAnnullare}
          titolo="richieste da annullare, "
          onClickText={() => {
            setAttivitaPendingClicked({
              richiesteDaAnnullare: true,
              txValueAttivo: "richieste da annullare"
            });
          }}
        />
        <AttivitaPendingText
          data={attivitaInPending.data.richiesteInGestione}
          titolo="richieste in gestione, "
          onClickText={() => {
            setAttivitaPendingClicked({
              richiesteInGestione: true,
              txValueAttivo: "richieste in gestione"
            });
          }}
        />
        <AttivitaPendingText
          data={attivitaInPending.data.richiestedaChiuderePositivamente}
          titolo="richieste da chiudere positivamente"
          onClickText={() => {
            setAttivitaPendingClicked({
              richiestedaChiuderePositivamente: true,
              txValueAttivo: "richieste da chiudere positivamente"
            });
          }}
        />
      </Row>
      <Row fluid>
        <Column lg="4" md="4" sm="8" sx="6" margin="0 0 0 auto">
          <Button
            color="primary"
            label="Inserimento nuova Domanda"
            value="Inserimento nuova Domanda"
            fontSize="f6"
            onClick={clickInserisciDomanda}
          />
        </Column>
      </Row>
      <Row fluid>
        <Column lg="2" md="6" sm="8" sx="6">
          <Input
            material
            label="Nome famiglia"
            name="Nomefamiglia"
            onChange={handleChangeRichiedente}
            inputValue={filterData.richiedente}
          />
        </Column>
        <Column lg="2" md="6" sm="8" sx="6">
          <DatePicker
            label="Data richiesta dal"
            selectedDate={filterData.dataRichiestaDal}
            onChange={handleChangeDataRichiestaDal}
          />
        </Column>
        <Column lg="2" md="6" sm="8" sx="6">
          <DatePicker
            label="Data richiesta al"
            selectedDate={filterData.dataRichiestaAl}
            onChange={handleChangeDataRichiestaAl}
          />
        </Column>
        <Column lg="3" md="6" sm="8" sx="6">
          {dominioTcbStatoRichiesta.data ? (
            <Select
              material
              name="Stato"
              label="Stato"
              clickedItem={handleChangeStatoRichiesta}
              items={dominioTcbStatoRichiesta.data}
              selectedValue={filterData.statoRichiesta}
              placeholder="Seleziona lo stato"
              intlFormatter
            />
          ) : null}
        </Column>
        <Column lg="3" md="6" sm="8" sx="6">
          <Select
            material
            name="Tipologia Servizio"
            label="Tipologia Servizio"
            clickedItem={handleChangeidServizio}
            items={dominioTcbTipoServizio}
            selectedValue={filterData.idServizio}
            intlFormatter
          />
        </Column>
      </Row>
      <Row fluid>
        <Column lg="2" md="6" sm="8" sx="6">
          <Input
            material
            label="Id domanda"
            name="IdDomanda"
            onChange={handleChangeIdDomandaBase}
            inputValue={filterData.idDomandaBase}
          />
        </Column>
        <Column lg="3" md="6" sm="8" sx="6">
          <Input
            material
            label="Lavoratore associato"
            name="LavoratoreAssociato"
            onChange={handleChangeLavoratoreAssociato}
            inputValue={filterData.lavoratoreAssociato}
          />
        </Column>
        <Column lg="2" md="4" sm="8" sx="6" padding="2.2em" margin="0 0 0 auto">
          <Button color="primary" label="Cerca" value="Cerca" fontSize="f6" onClick={clickCerca} />
        </Column>
      </Row>
      <Row justifycontent="center" flex>
        <Text
          value="Sono state trovate"
        />
        &nbsp;
        <Text
          value={`${richiesteTcbData.data.righeTotali || 0} ${richiesteTcbData.data.righeTotali === 0 || richiesteTcbData.data.righeTotali > 1 ? "domande" : "domanda"}`}
          weight="bold"
        />
        &nbsp;
        <Text
          value="secondo i filtri di ricerca impostati"
        />
        {attivitaPendingClicked.txValueAttivo ?
          <>
            &nbsp;
            <Text
              value={ `( ${attivitaPendingClicked.txValueAttivo} )` }
            />
          </>
          : null}
      </Row>
      <Row fluid>
        <Column xs="12">
          {richiesteTcbData.data.results ? (
            <Table
              size="f8"
              thWidth="10em"
              thHeight="3em"
              thBorder={`5px solid ${colors.darkBlue}`}
              tdBorder="none!important"
              thColor="white"
              tdHeight="3em"
              tdColor="darkGrey"
              headerBgColor="blue"
              tableWidth="100%"
              Colonne={Colonne}
              Righe={richiesteTcbData.data.results}
            />
          ) : null}
        </Column>
      </Row>

      <Row fluid justifycontent="center">
        <Pagination
          json={[]}
          callback={numero => {
            getElementi(numero);
          }}
          count={richiesteTcbData.data.righeTotali}
          currentPage={currentPage}
          numberitem={itemPerPage}
          setCurrentPage={setCurrentPage}
          navNumber={10}
        />
      </Row>

      <Drawer
        open={openDrawer}
        setOpenModal={setOpenDrawer}
        width="60%"
        header={() => <DrawerHeaderRichiesteTcb data={rowDataDrawer} />}
      >
        <DrawerBodyRichiesteTcb
          data={rowDataDrawer}
          richiesteTcbButtonsTypes={richiesteTcbButtonsTypes}
          updateTableDataCallback={updateTableData}
          setOpenDrawer={setOpenDrawer}
        />
      </Drawer>

      {openModalRiepilogo ? (
        <ModaleRiepilogoRichiesta
          openModal={openModalRiepilogo}
          setOpenModal={setOpenModalRiepilogo}
          idRichiestaTcb={idRichiestaTcb}
          idServizio={idServizio}
          locale={locale}
        />
      ) : null}
    </>
  );
};

BackofficeTcbListaRichieste.displayName = 'BackofficeTcbListaRichieste';
export default withRouter(BackofficeTcbListaRichieste);
