/** @format */

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { graphqlRequest, currentRequest } from 'redux-modules/actions/authActions';
import { Row } from 'components/ui/Grid';
import withAuthentication from 'hoc/withAuthentication';
import Pagination from 'components/ui2/Pagination';
import TransactionVoucherTable from './TransactionVoucherTable';


const TransactionVoucherTablePagination = ({
  currentPage,
  setCurrentPage,
  numberitem,
  transactionsVoucherList,
  getTransactionVoucherList,
  setOpenErrorModal,
  setOpenSuccessModal,
}) => {
  const currentItems = transactionsVoucherList.data?.list;

  return (
    <Fragment>
      <TransactionVoucherTable
        listaTransactionsVoucher={currentItems}
        refreshList={() => getTransactionVoucherList()}
        setOpenErrorModal={setOpenErrorModal}
        setOpenSuccessModal={setOpenSuccessModal}
      />
      <Row fluid justifycontent="center">
        <Pagination
          json={[]}
          count={transactionsVoucherList.data?.totalRows ? transactionsVoucherList.data?.totalRows : 0}
          currentPage={currentPage}
          numberitem={numberitem}
          setCurrentPage={setCurrentPage}
          navNumber={numberitem}
        />
      </Row>
    </Fragment>
  );
};
TransactionVoucherTablePagination.displayName = 'TransactionVoucherTablePagination';

const mapStoreToProps = (store) => ({
  locale: store.locale,
});
const mapDispatchToProps = {
  graphqlRequest,
  currentRequest,
};
export default connect(mapStoreToProps, mapDispatchToProps)(withAuthentication(TransactionVoucherTablePagination));
