/** @format */

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { graphqlRequest, currentRequest } from 'redux-modules/actions/authActions';
import { Row } from 'components/ui/Grid';
import withAuthentication from 'hoc/withAuthentication';
import Pagination from 'components/ui2/Pagination';
import VouchersTable from './Table';


const VoucherTablePagination = ({
  currentPage,
  setCurrentPage,
  numberitem,
  voucherList,
  getVoucherList,
  setOpenVoucherModal,
  findVoucher,
}) => {
  const currentItems = voucherList.data?.list;

  return (
    <Fragment>
      <VouchersTable
        listaVoucher={currentItems}
        refreshList={() => getVoucherList()}
        setOpenModal={setOpenVoucherModal}
        findVoucher={findVoucher}
      />
      <Row fluid justifycontent="center">
        <Pagination
          json={[]}
          count={voucherList.data?.totalRows ? voucherList.data?.totalRows : 0}
          currentPage={currentPage}
          numberitem={numberitem}
          setCurrentPage={setCurrentPage}
          navNumber={numberitem}
        />
      </Row>
    </Fragment>
  );
};
VoucherTablePagination.displayName = 'VoucherTablePagination';

const mapStoreToProps = (store) => ({
  locale: store.locale,
});
const mapDispatchToProps = {
  graphqlRequest,
  currentRequest,
};
export default connect(mapStoreToProps, mapDispatchToProps)(withAuthentication(VoucherTablePagination));
