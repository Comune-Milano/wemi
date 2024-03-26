import React from "react";
import Header from "components/ui2/Header";
import { Row, Column } from "components/ui/Grid";
import Button from "components/ui2/Button";
import { useState } from "react";
import Input from "components/ui2/Input";
import DatePicker from 'components/ui2/DatePicker';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import Select from "components/ui2/Select";
import moment from "moment";
import {
  EstraiCandidatureLavoratoriTcb as EstraiCandidatureLavoratoriTcbQ,
  DominioTcbByTipoTcb as DominioTcbByTipoTcbQ
} from './backofficeTcbCandidatureLavoratoriGraphQL';
import Table from "components/ui/Table";
import { colors } from "theme";
import Text from "components/ui/Text";
import ButtonIcon from "components/ui2/FaIcon/ButtonIcon";
import Pagination from 'components/ui2/Pagination';
import { connect } from 'react-redux';
import Drawer from "components/ui2/Drawer";
import { withRouter } from 'react-router-dom';
import { ID_SERVIZIO_TATA, ID_SERVIZIO_COLF, ID_SERVIZIO_BADANTE } from "types/tcbConstants";
import ModaleRiepilogo from "components/navigation/CandidaturaLavoratoreTCB/partials/ModaleRiepilogo";
import { DrawerHeaderCandidatureTcb, DrawerBodyCandidatureTcb } from './partials/DrawerCandidatureTcb';
import InfoMessageModal, { } from './partials/InfoMessageModal';
import { statiCandidatura } from 'types/statiCandidatura';

const BackofficeTcbCandidatureLavoratori = ({ locale, history }) => {

  // const estraiStato = useStatelessGraphQLRequest(
  //   estraiStatoCandidaturaQ,
  // );

  // const [redirectCandidatura, setRedirectCandidatura] = useState(false);

  const [openModalSummary, setOpenModalSummary] = useState(false);
  const [openInfoMessageModal, setOpenInfoMessageModal] = useState({
    open: false,
    title: null,
    message: null,
  });

  const [stepTransitionPending, setStepTransitionPending] = useState(false);

  const [stepCandidate, setStepCandidate] = useState();

  const [IdLav, setIdlav] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const [numeroElementi, setNumeroElementi] = useState(0);
  const [itemPerPage, _] = useState(10);
  const [{ openDrawer, rowDataDrawer }, setOpenDrawer] = useState({ openDrawer: false, rowDataDrawer: null });
  const filterAllStatoCandidatura = { id: null, value: "Tutti gli stati" };
  const filterAllStatoOccupazionale = { id: null, value: "Tutti gli stati" };
  const filterAllTipologiaServizio = { id: null, value: "Tutte le tipologie" };
  const [filterData, setFilterData] = useState({
    codiceFiscale: undefined,
    cognome: undefined,
    dataAggiornamentoDal: undefined,
    dataAggiornamentoAl: undefined,
    dataCambioStatoDal: undefined,
    dataCambioStatoAl: undefined,
    statoCandidatura: filterAllStatoCandidatura,
    statoOccupazionale: filterAllStatoOccupazionale,
    tipologiaServizio: filterAllTipologiaServizio
  });

  const colonne = [
    "ID Lavoratore",
    "Data ultimo aggiornamento",
    "Aggiornato da",
    "Tipologia di servizio",
    "Cognome Nome",
    "Stato candidatura",
    "Data cambio Stato",
    "Cambiato da",
    "Azioni"
  ];

  const [candidaturaLavoratoriTcbData, performRequestCandidaturaLavoratoriTcb] = useGraphQLRequest(
    [],
    EstraiCandidatureLavoratoriTcbQ,
    {
      numeroElementi: numeroElementi,
      locale: `{${locale}}`
    },
    true,
    data => {
      return {
        results: data.results.map(row => {
          return {
            idLavoratore: (
              <Text
                intlFormatter
                tag="h1"
                value={row.idLavoratore}
                style={{
                  cursor: "pointer",
                  fontSize: ".9rem",
                  fontWeight: "normal",
                  color: "#005CB9"
                }}
                onClick={handleClickLavoratore.bind(this, row)}
              />
            ),
            dataUltimoAggiornamento: moment(row.dataUltimoAggiornamento).format('DD/MM/YYYY-LT'),
            nomeUltimaModifica: row.nomeUltimaModifica,
            tipologiaServizio: row.tipologiaServizio,
            cognomeNome: `${row.cognome || ''}  ${row.nome || ''}`,
            statoCandidatura: row.statoCandidatura,
            dataCambioStato: row.dataCambioStato,
            ultimoOperatore: row.ultimoOperatore,
            azioni: (
              <ButtonIcon
                icon="angle-right"
                fontSize="f6"
                color="blue"
                onClick={handleClickAzioni.bind(this, row)}
              />
            )
          };
        }),
        righeTotali: data.righeTotali
      };
    }
  );

  const [dominioTcbStatoCandidatura, performRequestDominioTcbStatoCandidatura] = useGraphQLRequest(
    [],
    DominioTcbByTipoTcbQ,
    {
      ty_dominio_tcb: 52,
    },
    true,
    data => {
      const dataWithoutBozza= data.filter(el => el.value !== statiCandidatura.bozza);
      let _data = dataWithoutBozza.map(row => {
          return { id: row.value, value: row.textValue };
      });
      _data.unshift(filterAllStatoCandidatura);
      return _data;
    }
  );

  const [dominioTcbStatoOccupazionale] = useGraphQLRequest(
    [],
    DominioTcbByTipoTcbQ,
    {
      ty_dominio_tcb: 36,
    },
    true,
    data => {
      let _data = data.map(row => {
        return { id: row.value, value: row.textValue };
      });
      _data.unshift(filterAllStatoCandidatura);
      return _data;
    }
  );

  const filterTipologiaServizio = [
    filterAllTipologiaServizio,
    { id: ID_SERVIZIO_TATA, value: "Tata" },
    { id: ID_SERVIZIO_COLF, value: "Colf" },
    { id: ID_SERVIZIO_BADANTE, value: "Badante" },
  ];

  const handleClickAzioni = rowData => {
    setOpenDrawer({ openDrawer: true, rowDataDrawer: rowData });
  };

  const handleClickLavoratore = (row) => {
    setIdlav(row.idLavoratore)
    setOpenModalSummary(!openModalSummary)
  }

  const handleClickInoltraRichiesta = () => {

  };

  const handleClickInserimentoCandidatura = () => {
    history.push(`/r/InserimentoCandidatura`);
  };

  const [boolean, setBoolean] = useState(false);

  const handleClickCerca = () => {
    setBoolean(true);
    updateTableData(0);
    setCurrentPage(1);
  };

  const handleChangeCf = value => {
    setFilterData({
      ...filterData,
      codiceFiscale: value || undefined
    });
  };

  const handleChangeCognome = value => {
    setFilterData({
      ...filterData,
      cognome: value || undefined
    });
  };

  const handleChangeDataCambioStatoDal = value => {
    setFilterData({
      ...filterData,
      dataCambioStatoDal: value || undefined
    });
  };
  const handleChangeDataAggiornamentoDal = value => {
    setFilterData({
      ...filterData,
      dataAggiornamentoDal: value || undefined
    });
  };
  const handleChangeDataAggiornamentoAl = value => {
    setFilterData({
      ...filterData,
      dataAggiornamentoAl: value || undefined,
    });
  };

  const handleChangeDataCambioStatoAl = value => {
    setFilterData({
      ...filterData,
      dataCambioStatoAl: value || undefined
    });
  };

  const handleChangeStatoCandidatura = event => {
    setFilterData({
      ...filterData,
      statoCandidatura: event || undefined
    });
  };
  const handleChangeStatoOccupazionale = event => {
    setFilterData({
      ...filterData,
      statoOccupazionale: event || undefined
    });
  };
  const handleChangeTipologiaServizio = event => {
    setFilterData({
      ...filterData,
      tipologiaServizio: event || undefined
    });
  };

  const updateTableData = (elementi) => {
    setOpenDrawer({ openDrawer: false });
    const data = {
      codiceFiscale: filterData.codiceFiscale ? filterData.codiceFiscale.toUpperCase() + "%" : undefined,
      cognome: filterData.cognome ? filterData.cognome.toUpperCase() + "%" : undefined,
      dataAggiornamentoDal: filterData.dataAggiornamentoDal ? moment(filterData.dataAggiornamentoDal).format('YYYY-MM-DD') : undefined,
      dataAggiornamentoAl: filterData.dataAggiornamentoAl ? moment(filterData.dataAggiornamentoAl).format('YYYY-MM-DD') : undefined,
      dataCambioStatoDal: filterData.dataCambioStatoDal ? moment(filterData.dataCambioStatoDal).format('YYYY-MM-DD') : undefined,
      dataCambioStatoAl: filterData.dataCambioStatoAl ? moment(filterData.dataCambioStatoAl).format('YYYY-MM-DD') : undefined,
      statoCandidatura: filterData.statoCandidatura.id !== null ? filterData.statoCandidatura.id : undefined,
      statoOccupazionale: filterData.statoOccupazionale.id !== null ? filterData.statoOccupazionale.id : undefined,
      tipologiaServizio: filterData.tipologiaServizio.id !== null ? filterData.tipologiaServizio.id : undefined
    }

    performRequestCandidaturaLavoratoriTcb({
      numeroElementi: elementi !== undefined ? elementi : numeroElementi,
      locale: `{${locale}}`,
      searchFilter: Object.values(data).every(el => el === undefined) ? undefined : { ...data }
    });
  }

  const getElementi = numero => {
    let elementi = (numero - 1) * itemPerPage;
    setNumeroElementi(elementi);
    updateTableData(elementi);
  };
  const countResults = candidaturaLavoratoriTcbData.data && candidaturaLavoratoriTcbData.data.righeTotali;
  return (
    <div>
      <Header fontSize="f4" title="Gestione candidature Tate, Colf e Badanti" color={"blue"} />
      <Row fluid>
        <Column lg="4" md="4" sm="8" sx="6" margin="0 0 0 auto" padding="1em">
          <Button
            type="button"
            color="blue"
            fontSize="f7"
            label="Inoltra richiesta disponibilità"
            disabled={true}
            onClick={handleClickInoltraRichiesta}
          />
        </Column>
      </Row>
      <Row fluid>
        <Column lg="4" md="4" sm="8" sx="6" margin="0 0 0 auto" padding="1em">
          <Button
            type="button"
            color="blue"
            fontSize="f7"
            label="Inserimento nuova candidatura"
            onClick={handleClickInserimentoCandidatura}
          />
        </Column>
      </Row>
      <Row fluid>
        <Column lg="3" md="6" sm="8" sx="6">
          <Input
            material
            label="CF"
            name="codiceFiscale"
            onChange={handleChangeCf}
            inputValue={filterData.codiceFiscale}
          />
        </Column>
        <Column lg="3" md="6" sm="8" sx="6">
          <Input
            material
            label="Cognome"
            name="cognome"
            onChange={handleChangeCognome}
            inputValue={filterData.cognome}
          />
        </Column>
        <Column lg="3" md="6" sm="8" sx="6">
          <DatePicker
            label="Data ultimo aggiornamento dal"
            selectedDate={filterData.dataAggiornamentoDal}
            onChange={handleChangeDataAggiornamentoDal}
          />
        </Column>
        <Column lg="3" md="6" sm="8" sx="6">
          <DatePicker
            label="Data ultimo aggiornamento al"
            selectedDate={filterData.dataAggiornamentoAl}
            onChange={handleChangeDataAggiornamentoAl}
          />
        </Column>
        <Column lg="3" md="6" sm="8" sx="6">
          <DatePicker
            label="Data stato candidatura dal"
            selectedDate={filterData.dataCambioStatoDal}
            onChange={handleChangeDataCambioStatoDal}
          />
        </Column>
        <Column lg="3" md="6" sm="8" sx="6">
          <DatePicker
            label="Data stato candidatura al"
            selectedDate={filterData.dataCambioStatoAl}
            onChange={handleChangeDataCambioStatoAl}
          />
        </Column>
        <Column lg="3" md="6" sm="8" sx="6">
          {dominioTcbStatoCandidatura.data ? (
            <Select
              material
              name="StatoCandidatura"
              label="Stato candidatura"
              clickedItem={handleChangeStatoCandidatura}
              items={dominioTcbStatoCandidatura.data}
              selectedValue={filterData.statoCandidatura}
              intlFormatter
            />
          ) : null}
        </Column>
        <Column lg="3" md="6" sm="8" sx="6">
          {dominioTcbStatoOccupazionale.data ? (
            <Select
              material
              name="StatoOccupazionale"
              label="Stato occupazionale"
              clickedItem={handleChangeStatoOccupazionale}
              items={dominioTcbStatoOccupazionale.data}
              selectedValue={filterData.statoOccupazionale}
              intlFormatter
            />
          ) : null}
        </Column>
        <Column lg="3" md="6" sm="8" sx="6">
          {filterTipologiaServizio ? (
            <Select
              material
              name="Tipologia Servizio"
              label="Tipologia Servizio"
              clickedItem={handleChangeTipologiaServizio}
              items={filterTipologiaServizio}
              selectedValue={filterData.tipologiaServizio}
              intlFormatter
            />
          ) : null}
        </Column>
        <Column lg="2" md="3" sm="8" sx="6" alignitems="center" flex>
          <Button color="primary" label="Cerca" value="Cerca" fontSize="f6" onClick={handleClickCerca} />
        </Column>
      </Row>
      <Row justifycontent="center" >
        <Text
          value="Sono state trovate "
        />
          &nbsp;
           <Text
          value={`${countResults || 0} ${(countResults === 0 || countResults > 1) ? "candidature" : "candidatura"} `}
          weight="bold"
        />
          &nbsp;
          <Text
          value="che rispettano i criteri di ricerca impostati"
        />
      </Row>
      <Row fluid>
        <Column xs="12">
          {candidaturaLavoratoriTcbData.data.results ? (
            <Table
              size="f8"
              thWidth="10em"
              thHeight="3em"
              thBorder={`5px solid ${colors.darkBlue}`}
              tdBorder={"none!important"}
              thColor="white"
              tdHeight="3em"
              tdColor="darkGrey"
              headerBgColor="blue"
              tableWidth="100%"
              Colonne={colonne}
              Righe={candidaturaLavoratoriTcbData.data.results}
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
          count={countResults}
          currentPage={currentPage}
          numberitem={itemPerPage}
          setCurrentPage={setCurrentPage}
          navNumber={10}
        />
      </Row>
      <Drawer
        open={openDrawer}
        setOpenModal={setOpenDrawer}
        width={"60%"}
        header={() => <DrawerHeaderCandidatureTcb data={rowDataDrawer} />}
        children={

          <DrawerBodyCandidatureTcb
            data={rowDataDrawer}
            updateTableDataCallback={updateTableData}
            setOpenDrawer={setOpenDrawer}
            setOpenInfoMessageModal={setOpenInfoMessageModal}
          />
        }
      />
      <ModaleRiepilogo
        locale={locale}
        open={openModalSummary}
        setOpen={setOpenModalSummary}
        idLavoratore={IdLav}
      />

      <InfoMessageModal
        open={openInfoMessageModal.open}
        setOpen={setOpenInfoMessageModal}
        title={openInfoMessageModal.title}
        message={openInfoMessageModal.message}
      />
    </div>
  );
};

BackofficeTcbCandidatureLavoratori.displayName = "BackofficeTcbCandidatureLavoratori";

const mapStoreToProps = store => ({
  locale: store.locale,
})
export default withRouter(connect(mapStoreToProps)(BackofficeTcbCandidatureLavoratori));