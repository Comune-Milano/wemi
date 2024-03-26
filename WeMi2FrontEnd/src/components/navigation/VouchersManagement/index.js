import React, { useMemo, useState, useRef } from 'react';
import moment from 'moment';
import Button from 'components/ui2/Button';
import Text from 'components/ui/Text';
import { Row, Column } from 'components/ui/Grid';
import { Form } from 'libs/Form/components/Form';
import Loader from 'components/ui2/Loader';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { getVoucherList as getVoucherListQ,
  getStatoVoucher as getStatoVoucherQ,
  hasVouchersCont as hasVouchersContQ,
  downloadVouchersCont as downloadVouchersContQ } from './graphql/graphql';
import VouchersTablePagination from './partials/PaginatedTable/VoucherTablePagination';
import DownloadVoucherButton from './partials/DownloadButton/DownloadVoucherButton';
import ModaleCaricamentoVoucher from './partials/ModaleCaricamentoVoucher';
import VouchersFilteringSortingSection from './partials/VouchersFilteringSortingSection';
import BottoneListaTransazioni from './partials/BottoneListaTransazioni';
import { ErrorModal } from './partials/ComunicationModal/ErrorModal';
import { SuccessModal } from './partials/ComunicationModal/SuccessModal';
import { initialDataset, validationSchema, NUMBER_ITEMS_TABLE } from './costants';
import { dataMapperVoucherList } from './graphql/dataMappers';


const VouchersManagement = () => {
  // filter and order base
  const inputVoucherList = useRef({
    startValidDate: undefined,
    endValidDate: undefined,
    stateVoucher: undefined,
    codeVoucher: undefined,
    cfIntestatario: undefined,
    cfMinore: undefined,
    totalImport: undefined,
    remainingImport: undefined,
    countedImport: undefined,
    riferimentoBando: undefined,
    page: 1,
    elementsPerPage: NUMBER_ITEMS_TABLE,
  });
  const [voucherList, callVoucherList] = useGraphQLRequest(
    undefined,
    getVoucherListQ,
    { filters: inputVoucherList.current },
    true,
    // create JSON with totalRows and list
    dataMapperVoucherList
  );

  const [statiVoucher] = useGraphQLRequest(
    undefined,
    getStatoVoucherQ,
    undefined,
    true
  );

  const [openUploadVoucherModal, setOpenUploadVoucherModal] = useState(false);

  const [openErrorModal, setOpenErrorModal] = useState({ open: false, message: '' });

  const [openSuccessModal, setOpenSuccessModal] = useState({ open: false, message: '' });

  const { open: errorOpen, message: errorMessage } = openErrorModal;

  const { open: successOpen, message: successMessage } = openSuccessModal;

  // variabile per attivare il bottone di estrazione delle transazioni
  const [couldEstract, setCouldEstract] = useState(false);

  // variabile per verificare la presenza di transazioni
  const [hasVouchers] = useGraphQLRequest(
    undefined,
    hasVouchersContQ,
    {},
    rs => {
      return rs;
    },
  );

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const elementsToShow = NUMBER_ITEMS_TABLE;
  useMemo(() => {
    inputVoucherList.current.page = currentPage;
    callVoucherList(
      { filters: inputVoucherList.current }
    );
  }, [currentPage]);

  // Filter and Order
  const searchVouchers = (data) => {
    inputVoucherList.current.filters = {};
    // set search values
    inputVoucherList.current.filters.codiceVoucher = data.cod;
    inputVoucherList.current.filters.cfIntestatario = data.cfInt;
    inputVoucherList.current.filters.cfMinore = data.cfMin;
    inputVoucherList.current.filters.state = data.state?.id;
    inputVoucherList.current.filters.inizioValidita = data.inizioValidita ? moment(data.inizioValidita).format('YYYY-MM-DD') : undefined;
    inputVoucherList.current.filters.fineValidita = data.fineValidita ? moment(data.fineValidita).format('YYYY-MM-DD') : undefined;
    inputVoucherList.current.filters.bando = data.bando;
    // Verificare come gestire i decimali. Sembra interpretare male il separatore dei decimali.
    inputVoucherList.current.filters.minImporto = data.minImporto ? parseFloat(data.minImporto) : undefined; // .toFixed(2);
    inputVoucherList.current.filters.maxImporto = data.maxImporto ? parseFloat(data.maxImporto) : undefined; // .toFixed(2);
    // Checkbox per i voucher non utilizzati
    inputVoucherList.current.filters.nonUtilizzato = data.nonUtilizzato;
    // return page 1
    inputVoucherList.current.page = 1;
    setCurrentPage(1);
    callVoucherList(
      { filters: inputVoucherList.current }
    );
    // verifica se sono stati messi parametri di filtro per estrarre solo le transazioni filtrate
    if (
      inputVoucherList.current.filters.codiceVoucher ||
      inputVoucherList.current.filters.cfIntestatario ||
      inputVoucherList.current.filters.cfMinore ||
      inputVoucherList.current.filters.state ||
      inputVoucherList.current.filters.inizioValidita ||
      inputVoucherList.current.filters.fineValidita ||
      inputVoucherList.current.filters.bando ||
      inputVoucherList.current.filters.minImporto ||
      inputVoucherList.current.filters.maxImporto ||
      inputVoucherList.current.filters.nonUtilizzato) {
      setCouldEstract(true);
    } else {
      setCouldEstract(false);
    }
  };

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

  // funzione che chiama per il download
  const estraiVoucher = useStatelessGraphQLRequest(
    downloadVouchersContQ,
  );
  // funzione per il download
  const scaricaVouchers = () => estraiVoucher(
    {
      filters: inputVoucherList.current.filters,
    }
  );

  // funzione per il download
  const scaricaVouchersNonFiltrati = () =>
    estraiVoucher(
      {
        filters: {
          codiceVoucher: undefined,
          cfIntestatario: undefined,
          cfMinore: undefined,
          inizioValidita: undefined,
          fineValidita: undefined,
          bando: undefined,
          minImporto: undefined,
          maxImporto: undefined,
          state: 1,
        },
      }
    );

  return (
    <>
      {
        // loading VoucherList:
        voucherList.isLoading || voucherList.pristine ?
          <Loader size="4em" margin="auto" overlay />
          : null
      }
      <ModaleCaricamentoVoucher
        openUploadVoucherModal={openUploadVoucherModal}
        setOpenUploadVoucherModal={setOpenUploadVoucherModal}
        setOpenErrorModal={setOpenErrorModal}
        setOpenSuccessModal={setOpenSuccessModal}
        getVoucherList={callVoucherList}
      />
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
          <Row fluid justifycontent="flex-end" padding="0 0 2.4em 0">
            <Column lg="4" md="4" sm="6" padding="0" sizepadding={{ lg: '0 0 0 1.5em' }}>
              <Button
                type="button"
                disabled={false}
                width="100%"
                label="Carica Voucer"
                color="primary"
                size="f7"
                onClick={() => {
                  setOpenUploadVoucherModal(true);
                }}
                padding="0.4em 1em"
              />
            </Column>
            <Column lg="4" md="4" sm="6" padding="0" sizepadding={{ lg: '0 0.8em 0 1.5em' }} flex justifycontent="flex-end">
              <DownloadVoucherButton
                dataCallback={scaricaVouchers}
                disabled={!couldEstract || voucherList.data?.totalRows === 0}
                label="Estrai vouchers filtrati"
              />
            </Column>
            <Column lg="4" md="4" sm="6" padding="0" sizepadding={{ lg: '0 0 0 1.5em' }} flex justifycontent="flex-end">
              <DownloadVoucherButton
                dataCallback={scaricaVouchersNonFiltrati}
                disabled={voucherList.data?.totalRows === 0 || !hasVouchers.data}
                label="Estrai vouchers"
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
          <Row fluid margin="0 0 1em 0">
            <VouchersFilteringSortingSection
              dataset={dataset}
              setFormField={setFormField}
              isFormValid={isFormValid}
              onSearchSubmit={searchVouchers}
              errors={errors}
              statiVoucher={statiVoucher.data ? statiVoucher.data : []}
              creaItems={creaItems}
            />
          </Row>
        )}
      </Form>
      <Row fluid>
        <Column padding="1em 1em 1em 1em" flex justifycontent="flex-start">
          <Column lg="3" md="3" sm="6" padding="0" sizepadding={{ lg: '0 0 0 1.5em' }} flexwrap="no-wrap">
            <BottoneListaTransazioni active={voucherList.data?.totalRows > 0} />
          </Column>
          <Column lg="9" md="9" sm="6" padding="0.5em 0 0 0" sizepadding={{ lg: '0 0 0 1.5em' }}>
            <Text
              tag="span"
              size="f7"
              value="Sono stati trovati"
              padding="0 0 0 1.5em"
              color="darkGrey"
            />
            <Text
              tag="span"
              size="f7"
              value={`${voucherList.data?.totalRows ? voucherList.data?.totalRows : 0}`}
              padding="0 0 0 1.5em"
              weight="bold"
              color="darkGrey"
            />
            <Text
              tag="span"
              size="f7"
              value="voucher secondo i filtri di ricerca impostati"
              padding="0 0 0.5em 1.5em"
              color="darkGrey"
            />
          </Column>
        </Column>
      </Row>
      {voucherList.data?.totalRows > 0 ? (
        <Row fluid justifycontent="center">
          <VouchersTablePagination
            currentPage={currentPage}
            numberitem={elementsToShow}
            setCurrentPage={setCurrentPage}
            voucherList={voucherList}
            getVoucherList={callVoucherList}
            setOpenErrorModal={setOpenErrorModal}
            setOpenSuccessModal={setOpenSuccessModal}
          />
        </Row>
      ) : null}
    </>
  );
};

VouchersManagement.displayName = 'GestioneVoucherNavigation';

export default VouchersManagement;
