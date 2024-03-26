/** @format */

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { graphqlRequest, currentRequest } from 'redux-modules/actions/authActions';
import { Row } from 'components/ui/Grid';
import withAuthentication from 'hoc/withAuthentication';
import Pagination from 'components/ui2/Pagination';
import TransazioniTable from './TransazioniTable';


const TransazioniTablePagination = ({
  currentPage,
  setCurrentPage,
  numberitem,
  transazioniList,
  getTransazioniList,
  doSelect,
  transactionSelected,
  setOpenErrorModal,
  setOpenSuccessModal,
}) => {
  const currentItems = transazioniList.data.list.map(row => ({
    idTransazioneVoucher: row.idTransazioneVoucher,
    checked: transactionSelected.some(transazioneSelezionata => transazioneSelezionata === row.idTransazioneVoucher),
    codiceVoucher: row.codiceVoucher,
    importoSpeso: row.importoSpeso,
    state: row.state,
    dataUtilizzoVoucher: row.dataUtilizzoVoucher,
    dataContabilizzazione: row.dataContabilizzazione,
    servizioAcquistato: row.servizioAcquistato,
    nomeEnte: row.nomeEnte,
    idRichiestaServizioEnte: row.idRichiestaServizioEnte,
    bando: row.bando,
  }));

  return (
    <Fragment>
      <TransazioniTable
        listaTransazioni={currentItems}
        doSelect={doSelect}
        refreshList={() => getTransazioniList()}
        setOpenErrorModal={setOpenErrorModal}
        setOpenSuccessModal={setOpenSuccessModal}
      />
      <Row fluid justifycontent="center">
        <Pagination
          json={[]}
          count={transazioniList.data?.totalRows ? transazioniList.data?.totalRows : 0}
          currentPage={currentPage}
          numberitem={numberitem}
          setCurrentPage={setCurrentPage}
          navNumber={numberitem}
        />
      </Row>
    </Fragment>
  );
};
TransazioniTablePagination.displayName = 'TransazioniTablePagination';

const mapStoreToProps = (store) => ({
  locale: store.locale,
});
const mapDispatchToProps = {
  graphqlRequest,
  currentRequest,
};
export default connect(mapStoreToProps, mapDispatchToProps)(withAuthentication(TransazioniTablePagination));
