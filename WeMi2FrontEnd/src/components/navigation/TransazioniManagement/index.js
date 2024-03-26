import React, { useState, useRef, useMemo } from 'react';
import { moneyFormat } from 'utils/formatters/moneyFormat';
import moment from 'moment';
import Button from 'components/ui2/Button';
import Text from 'components/ui/Text';
import { Row, Column } from 'components/ui/Grid';
import { Form } from 'libs/Form/components/Form';
import Loader from 'components/ui2/Loader';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import {
  getTransazioniList as getTransazioniListQ,
  getStatoTransazione as getStatoTransazioneQ,
  contabilizzaTransazione as contabilizzaTransazioneM,
  hasTransactionsCont as hasTransactionsContQ,
  downloadTransactionsCont as downloadTransactionsContQ,
} from './graphql/graphql';
import DownloadButton from './partials/DownloadButton/DownloadButton';
import TransazioniTablePagination from './partials/PaginatedTable/TransazioniTablePagination';
import TransazioniFilteringSortingSection from './partials/TransazioniFilteringSortingSection';
import { ErrorModal } from './partials/CommunicationModal/ErrorModal';
import { SuccessModal } from './partials/CommunicationModal/SuccessModal';
import { initialDataset, validationSchema, NUMBER_ITEMS_TABLE } from './costants';
import { dataMapperTransazioniList } from './graphql/dataMappers';


const TransazioniManagement = () => {
  // filter and order base
  const inputTransactionList = useRef({
    filters: {
      codiceVoucher: undefined,
      state: undefined,
      dataTransazioneDa: undefined,
      dataTransazioneA: undefined,
      dataContabilizzazioneDa: undefined,
      dataContabilizzazioneA: undefined,
      importoTransazioneMin: undefined,
      importoTransazioneMax: undefined,
      cfMinore: undefined,
      cfIntestatario: undefined,
      bando: undefined,
    },
    elementsPerPage: NUMBER_ITEMS_TABLE,
    page: 1,
  });
  // variabile per la lista delle transazioni e chiamata graph che la popola
  const [transazioniList, callTransazioniList] = useGraphQLRequest(
    undefined,
    getTransazioniListQ,
    { filters: inputTransactionList.current },
    true,
    // create JSON with totalRows and list
    dataMapperTransazioniList
  );
  // variabile per verificare la presenza di transazioni
  const [hasTransactions] = useGraphQLRequest(
    undefined,
    hasTransactionsContQ,
    {},
    rs => {
      return rs;
    },
  );
  // variabile per attivare il bottone di estrazione delle transazioni
  const [couldEstract, setCouldEstract] = useState(false);
  // variabile per registrare gli delle transazioni selezionate
  const [transactionSelected, setTransactionSelected] = useState([]);
  // importo totale selezionato
  const [importoTotaleSelezionato, setImportoTotaleSelezionato] = useState(0);
  // variabile per aprire la modale di errore
  const [openErrorModal, setOpenErrorModal] = useState({ open: false, message: '' });
  const { open: errorOpen, message: errorMessage } = openErrorModal;
  // variabile per aprie la modale di successo
  const [openSuccessModal, setOpenSuccessModal] = useState({ open: false, message: '' });
  const { open: successOpen, message: successMessage } = openSuccessModal;
  // funzione per la contabilizzazione delle transazioni
  const mutationContabilizzaTransazione = useStatelessGraphQLRequest(
    contabilizzaTransazioneM, undefined, undefined, undefined, true,
  );
  // lista stati transazione
  const [statiTransazione] = useGraphQLRequest(
    undefined,
    getStatoTransazioneQ,
    undefined,
    true
  );
  // funzione che chiama per il download
  const estraiTransazioni = useStatelessGraphQLRequest(
    downloadTransactionsContQ,
  );
  // funzione per il download
  const scaricaTransazioni = () => estraiTransazioni(
    {
      filters: inputTransactionList.current.filters,
      idVouchersList: transactionSelected,
    }
  );

  // funzione per il download
  const scaricaTransazioniNonFiltrate = () =>
    estraiTransazioni(
      {
        filters: {
          codiceVoucher: undefined,
          state: 1,
          dataTransazioneDa: undefined,
          dataTransazioneA: undefined,
          dataContabilizzazioneDa: undefined,
          dataContabilizzazioneA: undefined,
          importoTransazioneMin: undefined,
          importoTransazioneMax: undefined,
          cfMinore: undefined,
          cfIntestatario: undefined,
          bando: undefined,
        },
        idVouchersList: [],
      }
    );

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const elementsToShow = NUMBER_ITEMS_TABLE;
  // al cambiare della pagina ri-esegue la chiamata
  useMemo(() => {
    inputTransactionList.current.page = currentPage;

    callTransazioniList(
      { filters: inputTransactionList.current }
    );
  }, [currentPage]);

  // Filter
  const searchTransazioni = (data) => {
    // set search values
    inputTransactionList.current.filters.codiceVoucher = data.codiceVoucher;
    inputTransactionList.current.filters.cfIntestatario = data.cfIntestatario;
    inputTransactionList.current.filters.cfMinore = data.cfMinore;
    inputTransactionList.current.filters.state = data.state?.id;
    inputTransactionList.current.filters.dataTransazioneDa = data.dataTransazioneDa ? moment(data.dataTransazioneDa).format('YYYY-MM-DD') : undefined;
    inputTransactionList.current.filters.dataTransazioneA = data.dataTransazioneA ? moment(data.dataTransazioneA).format('YYYY-MM-DD') : undefined;
    inputTransactionList.current.filters.dataContabilizzazioneDa = data.dataContabilizzazioneDa ? moment(data.dataContabilizzazioneDa).format('YYYY-MM-DD') : undefined;
    inputTransactionList.current.filters.dataContabilizzazioneA = data.dataContabilizzazioneA ? moment(data.dataContabilizzazioneA).format('YYYY-MM-DD') : undefined;
    inputTransactionList.current.filters.bando = data.bando;
    inputTransactionList.current.filters.importoTransazioneMin = data.importoTransazioneMin ? parseFloat(data.importoTransazioneMin) : undefined;
    inputTransactionList.current.filters.importoTransazioneMax = data.importoTransazioneMax ? parseFloat(data.importoTransazioneMax) : undefined;
    // return page 1
    inputTransactionList.current.page = 1;
    setCurrentPage(1);
    callTransazioniList(
      { filters: inputTransactionList.current }
    );
    // azzeramento transazioni selezionate e importo totale
    setTransactionSelected([]);
    setImportoTotaleSelezionato(0);
    // verifica se sono stati messi parametri di filtro per estrarre solo le transazioni filtrate
    if (
      inputTransactionList.current.filters.codiceVoucher ||
      inputTransactionList.current.filters.cfIntestatario ||
      inputTransactionList.current.filters.cfMinore ||
      inputTransactionList.current.filters.state ||
      inputTransactionList.current.filters.dataTransazioneDa ||
      inputTransactionList.current.filters.dataTransazioneA ||
      inputTransactionList.current.filters.dataTransazioneDa ||
      inputTransactionList.current.filters.dataTransazioneA ||
      inputTransactionList.current.filters.bando ||
      inputTransactionList.current.filters.importoTransazioneMin ||
      inputTransactionList.current.filters.importoTransazioneMax) {
      setCouldEstract(true);
    } else {
      setCouldEstract(false);
    }
  };

  // Gestione Select
  const onCheckBoxInteract = (idTransazione, checked) => {
    operationCheckBox(idTransazione, checked);
  };

  const checkSelectAll = () => {
    let flag = false;
    if (transazioniList.isLoading || transazioniList.pristine) {
      flag = true;
    } else {
      transazioniList.data.list.forEach(element => {
        if (!transactionSelected.includes(element.idTransazioneVoucher) && element.state === 'Registrata') {
          flag = true;
        }
      });
    }
    return flag;
  };

  const operationCheckBox = (idTransazione, checked) => {
    // settaggio di checked nella transazioniList
    const transazioni = transazioniList.data.list.filter(trans => trans.idTransazioneVoucher === idTransazione);
    transazioni[0].checked = checked;
    // modifico importo selezionato e count transazioni
    let importo = importoTotaleSelezionato;
    // variabile appoggio per le transazioni selezionate
    if (checked) {
      importo += transazioni[0].importoSpeso;
      setTransactionSelected([...transactionSelected, transazioni[0].idTransazioneVoucher]);
    } else {
      importo -= transazioni[0].importoSpeso;
      setTransactionSelected(transactionSelected.filter(transaction => transaction !== idTransazione));
    }
    setImportoTotaleSelezionato(importo);
  };

  const onClickSelezionaTutto = () => {
    let importo = importoTotaleSelezionato;
    let transazioniSelezionate = transactionSelected;
    const isSelectAll = checkSelectAll();

    transazioniList.data.list.forEach(transazione => {
      if (isSelectAll) {
        if (!transactionSelected.includes(transazione.idTransazioneVoucher) && transazione.state === 'Registrata') {
          importo += transazione.importoSpeso;
          transazioniSelezionate.push(transazione.idTransazioneVoucher);
        }
      } else if ((transactionSelected.includes(transazione.idTransazioneVoucher)) && transazione.state === 'Registrata') {
        importo -= transazione.importoSpeso;
        transazioniSelezionate = transazioniSelezionate.filter(transaction => transaction !== transazione.idTransazioneVoucher);
      }
    });
    setTransactionSelected(transazioniSelezionate);
    setImportoTotaleSelezionato(importo);
  };

  const onClickContabilizzaTransazioniSelezionate = async () => {
    const transazioniDaContabilizzare = [];
    transactionSelected.forEach(transazione => {
      transazioniDaContabilizzare.push(transazione);
    });
    try {
      await mutationContabilizzaTransazione({ id: transazioniDaContabilizzare });
      setOpenSuccessModal({
        open: true,
        message: 'Operazione effettuata con successo',
      });
    } catch (error) {
      setOpenErrorModal({ open: true });
    }
    setTransactionSelected([]);
    setImportoTotaleSelezionato(0);
    callTransazioniList(
      { filters: inputTransactionList.current }
    );
  };
  // function necessaria per il funzionamento della select nel filtro
  const creaItems = (arr) => {
    const ris = [];
    if (!arr) {
      return ris;
    }
    arr.forEach(element => {
      ris.push({ id: element.value, value: element.textValue });
    });
    return ris;
  };

  return (
    <>
      {
        // loading VoucherList:
        transazioniList.isLoading || transazioniList.pristine ?
          <Loader size="4em" margin="auto" overlay />
          : null
      }
      <ErrorModal
        open={errorOpen}
        setOpenErrorModal={setOpenErrorModal}
        message={errorMessage}
      />
      <SuccessModal
        open={successOpen}
        setOpenSuccessModal={setOpenSuccessModal}
        message={successMessage}
      />
      <Row fluid>
        <Column padding="0 1em 0 1em">
          <Row fluid justifycontent="flex-end" padding="0 0 2.6em 0">
            <Column lg="6" md="6" sm="6" padding="0" sizepadding={{ lg: '0 0 0 1.5em' }} flex justifycontent="flex-end">
              <DownloadButton
                dataCallback={scaricaTransazioni}
                disabled={!couldEstract || transazioniList.data?.totalRows === 0}
                label="Estrai transazioni filtrate"
              />
            </Column>
            <Column lg="6" md="6" sm="6" padding="0" sizepadding={{ lg: '0 0 0 1.5em' }} flex justifycontent="flex-end">
              <DownloadButton
                dataCallback={scaricaTransazioniNonFiltrate}
                disabled={transazioniList.data?.totalRows === 0 || !hasTransactions.data}
                label="Estrai transazioni non contabilizzate"
              />
            </Column>
          </Row>
        </Column>
      </Row>
      <Form
        validateOnChange
        initialDataset={initialDataset}
        validationSchema={validationSchema}
      >
        {({ dataset, setFormField, isFormValid, errors }) => (
          <Row fluid margin="0">
            <TransazioniFilteringSortingSection
              dataset={dataset}
              setFormField={setFormField}
              isFormValid={isFormValid}
              onSearchSubmit={searchTransazioni}
              errors={errors}
              statiTransazioni={statiTransazione.data ? statiTransazione.data : []}
              creaItems={creaItems}
            />
          </Row>
        )}
      </Form>
      <Row padding="1.5em 0 0 0" fluid>
        <Column padding="0" flex justifycontent="flex-start">
          <Column lg="3" md="3" sm="6" padding="0" margin="0.4em 0 0 0" sizepadding={{ lg: '0 0 0 1.5em' }} flexwrap="no-wrap">
            <Button
              type="button"
              disabled={transazioniList.data?.totalRows === 0}
              width="100%"
              label={checkSelectAll() || transazioniList.data?.totalRows === 0 ? 'Seleziona tutto' : 'Deseleziona tutto'}
              color="primary"
              fontSize="f7"
              onClick={() => onClickSelezionaTutto()}
              padding="0.4em 1em"
              margin="0em 0em 0.4em 0em"
            />
          </Column>
          <Column lg="5" md="6" sm="6" padding="0" sizepadding={{ lg: '0 0 0 1.5em' }}>
            <Row>
              <Text
                tag="span"
                size="f7"
                value="Sono stati trovati"
                padding="0 0 0 0.5em"
                color="darkGrey"
              />
              <Text
                tag="span"
                size="f7"
                value={`${transazioniList.data?.totalRows ? transazioniList.data?.totalRows : 0}`}
                padding="0 0 0 1em"
                weight="bold"
                color="darkGrey"
              />
              <Text
                tag="span"
                size="f7"
                value="transazioni secondo i filtri di ricerca impostati"
                padding="0 0 0.5em 1em"
                color="darkGrey"
              />
            </Row>
            <Row>
              <Text
                tag="span"
                size="f7"
                value="Sono state selezionate"
                padding="0 0 0 0.5em"
                color="darkGrey"
              />
              <Text
                tag="span"
                size="f7"
                value={`${transactionSelected.length}`}
                padding="0 0 0 0.5em"
                weight="bold"
                color="darkGrey"
              />
              <Text
                tag="span"
                size="f7"
                value="transazioni, per un importo totale di"
                padding="0 0 0.5em 0.5em"
                color="darkGrey"
              />
              <Text
                tag="span"
                size="f7"
                value={`${moneyFormat(importoTotaleSelezionato, true)}`}
                padding="0 0 0 0.5em"
                weight="bold"
                color="darkGrey"
              />
            </Row>
          </Column>
          <Column lg="4" md="3" sm="6" padding="0" margin="0.5em 1em 0 0" sizepadding={{ lg: '0 0 0 1.5em' }} flexwrap="no-wrap">
            <Button
              type="button"
              disabled={transactionSelected.length === 0}
              width="100%"
              label="Contabilizza transazioni selezionate"
              color="primary"
              size="f7"
              onClick={() => onClickContabilizzaTransazioniSelezionate()}
              padding="0.4em 1em"
              margin="0em 0em 0.4em 0em"
            />
          </Column>
        </Column>
      </Row>
      {transazioniList.data?.totalRows > 0 ? (
        <Row fluid justifycontent="center">
          <TransazioniTablePagination
            currentPage={currentPage}
            numberitem={elementsToShow}
            setCurrentPage={setCurrentPage}
            transazioniList={transazioniList}
            getTransazioniList={callTransazioniList}
            doSelect={onCheckBoxInteract}
            transactionSelected={transactionSelected}
            setOpenErrorModal={setOpenErrorModal}
            setOpenSuccessModal={setOpenSuccessModal}
          />
        </Row>
      ) : null}
    </>
  );
};

TransazioniManagement.displayName = 'TransazioniManagementNavigation';

export default TransazioniManagement;
